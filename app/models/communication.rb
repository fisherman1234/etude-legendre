# encoding: utf-8
class Communication < ActiveRecord::Base
  belongs_to :dossier
  belongs_to :activite
  belongs_to :message_template
  belongs_to :contact, :foreign_key => :sender_id
  before_save :set_infos
  has_many :documents, :through => :document_to_communications
  has_many :contacts, :through => :contact_to_communications
  has_many :contact_to_communications, :dependent => :destroy
  has_many :document_to_communications,  :dependent => :destroy
  
  accepts_nested_attributes_for :contact_to_communications, 
                                :allow_destroy => true
                                
  accepts_nested_attributes_for :document_to_communications, 
                                :allow_destroy => true
                                
  accepts_nested_attributes_for :documents, 
                                :allow_destroy => true, 
                                :reject_if => :all_blank
                                
  liquid_methods :date_communication, :subject_id, :description
  
                 
  def set_infos
    if sender_id.nil?
      self.sender_id = self.dossier.user.contacts.first.id
    end
  end
  
  def date_communication
    return I18n.localize(Communication.last.created_at, :format => "%e %B %Y")
  end
  
  def generate_attachments_docs
    self.contact_to_communications.where('transmission_medium_id != 0').each do |concom|
      concom.render_final_file  
    end
  end
  
  def generate_summary_spreadsheet
      @dossier = self.dossier
      @expert = @dossier.user.contacts.first
      Spreadsheet.client_encoding = 'UTF-8'
      @template = Liquid::Template.parse(description)
      
      book = Spreadsheet::Workbook.new
      sheet1 = book.create_worksheet
      sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', self.activite.description
      sheet1.row(1).push 'Communication', description, 'Date', self.activite.date_visite
      sheet1.row(3).push 'Destinataire', 'Email', 'Adresse', 'Moyen d\'envoi', 'Lien du fichier', 'Corps du mail'
      k=0
      while k < 8
        sheet1.column(k).width = 20
        k = k+1
      end
      i = 4
      self.contact_to_communications.each do |concom|
        contact = concom.contact
        sheet1.row(i).push contact.full_name, contact.email, contact.full_adresse, concom.transmission_medium.try(:description), concom.generate_template_doc_link, @template.render( 'dossier' => @dossier, 'destinataire'=> contact, 'expert' => @expert, 'communication' => @communication) 
        i +=1
      end
      sheet2 = book.create_worksheet
      sheet2.name = "Lettre simple"
      sheet2.row(0).push 'ENTREP', 'CONTACT', 'ADR1', 'ADR2', 'ADR3', 'CP_VILLE'
      i = 1
      self.contact_to_communications.each do |concom|
        if concom.transmission_medium_id == 2
          contact = concom.contact
          sheet2.row(i).push contact.institution.try(:nom), contact.full_name, contact.adresse1, contact.adresse2, contact.adresse3, contact.code_postal+' '+contact.ville.to_s.upcase
          i +=1
        end
      end
      sheet3 = book.create_worksheet
      sheet3.name = "Lettre recommandée"
      sheet3.row(0).push 'ENTREP', 'CONTACT', 'ADR1', 'ADR2', 'ADR3', 'CP_VILLE'
      i = 1
      self.contact_to_communications.each do |concom|
        if concom.transmission_medium_id == 3
          contact = concom.contact
          sheet3.row(i).push contact.institution.try(:nom), contact.full_name, contact.adresse1, contact.adresse2, contact.adresse3, contact.code_postal+' '+contact.ville.to_s.upcase
          i +=1
        end
      end
      return book

  end
  
end
