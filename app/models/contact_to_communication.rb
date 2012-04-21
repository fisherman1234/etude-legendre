class ContactToCommunication < ActiveRecord::Base
  belongs_to :contact
  belongs_to :communication
  belongs_to :contact_acteur
  belongs_to :transmission_medium
  before_save :set_infos
  
  attr_accessor :partie
  has_attached_file :final_file,
    :storage => :s3,
    :url => "/system/:hash.:extension",
    :hash_secret => "longSecretString",
    :bucket => 'etude-legendre',
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
    
  liquid_methods :moyenTransmission, :nomDestinataire, :prenomDestinataire, :adresse1, :adresse2, :adresse3, :code_postal, :pays, :telephone, :email, :fax, :genre_lettre, :genre_adresse, :references_courrier, :ville
  

  def set_infos
    @dossier = self.communication.dossier
    @contact = self.contact
    @contact_acteur = @dossier.contact_acteurs.where(:contact_id => contact_id).first
    if !@contact_acteur.nil?      
      self.contact_acteur_id = @contact_acteur.id
      puts self.inspect
    end
  end
  
  def moyenTransmission
    return self.transmission_medium.description
  end
  
  def nomDestinataire
    return self.contact.nom
  end
  
  def prenomDestinataire
    return self.contact.prenom
  end
  
  def generate_email_doc
    a = "R_64d5c9cba22c95c6a0048afcc7bb4d90"
    b = "thibaultpoisson"
    bitly = Bitly.new(b,a)
    
    static_files = self.communication.documents.map {|document| bitly.shorten(AWS::S3::S3Object.url_for(document.file.path, document.file.bucket_name, :expires_in => 1.year)).short_url }
    return static_files
  end
  
  def generate_template_doc_link
    a = "R_64d5c9cba22c95c6a0048afcc7bb4d90"
    b = "thibaultpoisson"
    bitly = Bitly.new(b,a)
    static_files =  bitly.shorten(AWS::S3::S3Object.url_for(self.final_file.path, self.final_file.bucket_name, :expires_in => 1.year)).short_url
    return static_files
  end
  
  def send_communication
    CommunicationMailer.send_communication(self).deliver
  end
  
  
  def render_final_file
    @concom = self
    @contact = self.contact
    @communication = self.communication
    @dossier = @communication.dossier
    @other_recipients = @communication.contact_to_communications.find(:all, :conditions => ["id != ? AND (transmission_medium_id = 2 OR transmission_medium_id=3)", @concom.id])
    @other_copy = @communication.contact_to_communications.find(:all, :conditions => ["id != ? AND transmission_medium_id =1", @concom.id])
    @expert = @dossier.user.contacts.first
    @convocation = Activite.find(@communication.activite.linked_activite_id)
    
    @template_signature = Liquid::Template.parse(@dossier.user.signature_lettres)
    @template = Liquid::Template.parse(@communication.letter_body)
    @template_sujet = Liquid::Template.parse(@communication.subject_id)
    
    @margins_top = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_haut || 10)/25.4).to_s+'in'
    @margins_bottom = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_bas || 10)/25.4).to_s+'in'
    @margins_right = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_droite || 10)/25.4).to_s+'in'
    @margins_left = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_gauche || 10)/25.4).to_s+'in'
    
    html = ActionView::Base.new(Rails.configuration.paths.app.views.first).render(:template => 'message_templates/show.html.haml', :format=>'html',:layout => "layouts/pdf.html.pdf.haml", :locals => {
      :@concom =>@concom, 
      :@contact => @contact,
      :@template_signature => @template_signature, 
      :@template => @template, 
      :@template_sujet => @template_sujet, 
      :@other_recipients=>@other_recipients, 
      :@other_copy => @other_copy,
      :@communication=>@communication, 
      :@dossier=>@dossier,
      :@convocation => @convocation,
      :@expert=> @expert})
    
    puts "html rendered"

    kit = PDFKit.new(html, :print_media_type => true, :page_size => 'A4', :no_background => true,         
    :margin_top => @margins_top, 
    :margin_right =>@margins_right,
    :margin_left => @margins_left,
    :footer_right => "Page [page]/[toPage]", 
    :footer_font_size => "10")

    kit = kit.to_pdf
    #puts kit
    puts "text pdf content rendered"

    ##stamping
    #file_top = Tempfile.open("bak")
    #file_top.write kit.to_s
    file_top = File.new("#{RAILS_ROOT}/tmp/myfile_#{Process.pid}", "w+")
    
    File.open(file_top.path, "w+b") do |f|
      f.write(kit.to_s)
    end
    
    #todo : bloque 404 sur heroku ??
    #file_bak = open(@dossier.parametres_cabinet.en_tete)
    file_bak = open("http://dl.dropbox.com/u/8806/bak.pdf")

    
    puts "remote background fetched"
    pdf_output = `pdftk #{file_top.path} background #{file_bak.path} output - flatten`
    puts "output generated"
    file = StringIO.new(pdf_output) #mimic a real upload file
        file.class.class_eval { attr_accessor :original_filename, :content_type } #add attr's that paperclip needs
        file.original_filename = "labels.pdf"
        file.content_type = "application/pdf"
    @concom.final_file = file
    @concom.save
    puts "pdf uploaded"
    return  AWS::S3::S3Object.url_for(self.final_file.path, self.final_file.bucket_name, :expires_in => 1.year)
  end
  
  
end
