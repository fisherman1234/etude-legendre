class Contact < ActiveRecord::Base
  has_many :contact_acteurs, :dependent => :destroy
  belongs_to :institution
  belongs_to :user
  has_many :documents
  belongs_to :type_intervenant
  has_paper_trail 
  attr_accessor :nom_complet
  attr_accessor :full_name
  attr_accessor :entreprise
  
  liquid_methods :id, :nom, :prenom, :civilite, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :portable, :email, :site_web, :institution_id, :genre_adresse, :genre_lettre, :created_at, :updated_at, :type_intervenant_id, :avocat_au_barreau, :notes, :contact_medium_id, :user_id, :parametres_cabinet_id
  
  before_save :default_values
  def default_values
    self.prenom ||= ''
    self.nom ||= ''
    self.contact_medium_id ||= 1
    if self.institution_id_changed? && !self.institution_id.nil?
      self.institution_description = self.institution.nom
    end
    
  end
  
  def self.set_companies
    Contact.all.each do |contact|
      if !contact.institution_id.nil?
        contact.institution_description = contact.institution.nom
        contact.save
      end
    end
  end
  
  def civilite
    if civilite_id
      Civilite.find(civilite_id).try(:description)
    else
      ""
    end
  end
  
  def civilite=(param)
    self.civilite_id = param
  end
  
  def full_name_inc_civilite
    [civilite, prenom, nom].join(' ')
  end
  
  def full_name
    [prenom, nom].join(' ')
  end
  
  def full_adresse
    [genre_adresse,full_name,adresse1,adresse2,adresse3,code_postal,ville ].join(' ')
  end

  def geo_adresse
    [adresse1,adresse2,adresse3,code_postal,ville ].join(' ')
  end

end