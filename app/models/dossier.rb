class Dossier < ActiveRecord::Base
  has_many :acteurs
  belongs_to :type_decision
  belongs_to :type_expertise
  belongs_to :institution
  after_create :create_actors
  has_many :documents
  has_many :activites
  has_paper_trail
  belongs_to :parametres_cabinet
  belongs_to :user
  has_many :consignations
  

  
  
  has_attached_file :recap_frais,
    :storage => :s3,
    :bucket => 'etude-legendre',
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
  
  
  before_update :set_cabinet
  before_create :set_cabinet
  has_many :expenses
  
  liquid_methods :nom_dossier, :ref_cabinet, :date_decision, :date_avis_designation, :date_cible_depot_rapport, :date_effective_depot_raport, :numero_role_general, :typeExpertise, :typeDecision, :juridiction, :date_debut_op_theorique
  
  def set_cabinet
    if self.user_id && self.user_id_changed?
      a = User.find(user_id)
      self.parametres_cabinet_id = a.parametres_cabinet_id
      acteur = self.acteurs.find_or_initialize_by_type_acteur_id(7)
      acteur.description = TypeActeur.find(7).description
      contactacteur = acteur.contact_acteurs.build(:qualite_procedurale_id => 13, :contact_id => User.find(user_id).contacts.first.id)
      contactacteur.save
    end
  end
  
  def contacts
    return self.acteurs.map{|l| [l.description, l.contact_acteurs.map{|u| u.contact}]}
  end
  
  
  def typeExpertise
    return self.type_expertise.description
  end
  
  def typeDecision
    return self.type_decision.description
  end
  
  def juridiction
    return self.institution.nom
  end
  
  def institution_id=(institution_id)
    write_attribute(:institution_id, institution_id)
    a = self.acteurs.find_or_initialize_by_type_acteur_id(1)
    a.type_acteur_id = 1
    a.description = Institution.find(institution_id).nom
    a.save
  end
  
  def create_actors
    Acteur.create(:type_acteur_id => 3, :dossier_id => self.id, :description => TypeActeur.find(3).description)
    Acteur.create(:type_acteur_id => 4, :dossier_id => self.id, :description => TypeActeur.find(4).description)
    Acteur.create(:type_acteur_id => 5, :dossier_id => self.id, :description => TypeActeur.find(5).description)
    Acteur.create(:type_acteur_id => 6, :dossier_id => self.id, :description => TypeActeur.find(6).description)
    Acteur.create(:type_acteur_id => 7, :dossier_id => self.id, :description => TypeActeur.find(7).description)
  end
  
  def acteur_tribunal
    self.acteurs.find(:first, :conditions => {:type_acteur_id => 1})
  end
  
  def juge_mission
    self.acteur_tribunal.contact_acteurs.find(:first, :conditions => {:qualite_procedurale_id => 2})
  end
  
  def juge_controlleur
    self.acteur_tribunal.contact_acteurs.find(:first, :conditions => {:qualite_procedurale_id => 1})
  end
    
  
  def juges=(juges)
    a = self.acteur_tribunal
    if a == nil
      b = self.acteurs.build(:type_acteur_id => 1)
      b.description = Institution.find(institution_id).nom
      b.contact_acteurs.build(:qualite_procedurale_id => 2, :contact_id => juges["juge_mission_id"])
      b.contact_acteurs.build(:qualite_procedurale_id => 1, :contact_id => juges["juge_controlleur_id"])
    else
      self.acteur_tribunal.contact_acteurs.find_or_initialize_by_qualite_procedurale_id(2).update_attribute(:contact_id, juges["juge_mission_id"])
      self.acteur_tribunal.contact_acteurs.find_or_initialize_by_qualite_procedurale_id(1).update_attribute(:contact_id, juges["juge_controlleur_id"])
    end
  end
  

  
  def total_frais
    @expenses = self.expenses.find(:all, :conditions => ['categorie_id != 2'])
    return @expenses.map {|l| l.total}.sum.round(2)
  end
  
  def total_honoraires
    @expenses = self.expenses.find(:all, :conditions => ['categorie_id = 2'])
    return @expenses.map {|l| l.total}.sum.round(2)
  end
  
  def total_ht
    @expenses = self.expenses.all
    return @expenses.map {|l| l.total}.sum.round(2)
  end
  
  def tableau_tva
    @expenses = self.expenses.all
    tableau = []
    @expenses.group_by { |t| t.taux_tva_id }.each do |key, values|
      tableau.push([key, values.map{|l| l.total}.sum.round(2), values.map{|l| l.total_tva}.sum.round(2), values.map{|l| l.total_ttc}.sum.round(2)])
    end
    return tableau
  end
  
  def total_tva
    @expenses = self.expenses.all
    return  @expenses.map{|l| l.total_tva}.sum.round(2)
  end
  
  def total_ttc
    @expenses = self.expenses.all
    return  @expenses.map{|l| l.total_ttc}.sum.round(2)
  end
  
  def montant_consigne
    @consignations = self.consignations.all
    return @consignations.map{|l| l.consignation_lines.where(:type_status_consignation_id => 3).first.try(:montant).to_f}.sum.round(2)
  end
  
  def montant_paye
    @consignations = self.consignations.all
    return @consignations.map{|l| l.consignation_lines.where(:type_status_consignation_id => 4).first.try(:montant).to_f}.sum.round(2)
  end
  
  def montant_a_recevoir
    return self.montant_consigne - self.montant_paye
  end
  
  def reste_du
    return self.total_ht - self.montant_paye
  end
  
  
  def render_recap_frais
    @dossier = self
    @expenses = self.expenses
    @margins_top = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_haut || 10)/25.4).to_s+'in'
    @margins_bottom = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_bas || 10)/25.4).to_s+'in'
    @margins_right = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_droite || 10)/25.4).to_s+'in'
    @margins_left = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_gauche || 10)/25.4).to_s+'in'
    
    
    
    html = ActionView::Base.new(Rails.configuration.paths.app.views.first).render(:template => 'dossiers/recap_frais_full.html.haml', :format=>'html',:layout => "layouts/pdf.html.pdf.haml", :locals => {
      :@dossier => @dossier,
      :@expenses => @expenses})
    
    puts "html rendered"

    kit = PDFKit.new(html, :print_media_type => true, :page_size => 'A4',         
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
    
    File.open(file_top.path, "w+") do |f|
      f.write(kit.to_s)
    end
    
    file_bak = open(@dossier.parametres_cabinet.en_tete)
    puts "remote background fetched"
    pdf_output = `pdftk #{file_top.path} background #{file_bak.path} output - flatten`
    puts "output generated"
    file = StringIO.new(pdf_output) #mimic a real upload file
        file.class.class_eval { attr_accessor :original_filename, :content_type } #add attr's that paperclip needs
        file.original_filename = "labels.pdf"
        file.content_type = "application/pdf"
    self.recap_frais = file
    self.save
    puts "pdf uploaded"
    return  generate_template_doc_link
  end
  
  def generate_template_doc_link
    a = "R_64d5c9cba22c95c6a0048afcc7bb4d90"
    b = "thibaultpoisson"
    bitly = Bitly.new(b,a)
    
    static_files =  bitly.shorten(AWS::S3::S3Object.url_for(self.recap_frais.path, self.recap_frais.bucket_name, :expires_in => 1.year)).short_url
    return static_files
  end
  
end
