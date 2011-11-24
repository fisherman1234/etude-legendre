class Contact < ActiveRecord::Base
  has_many :contact_acteurs, :dependent => :destroy
  belongs_to :institution
  belongs_to :user
  has_many :documents
  belongs_to :type_intervenant
  has_paper_trail 
  attr_accessor :nom_complet
  attr_accessor :full_name
  
  liquid_methods :id, :nom, :prenom, :civilite, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :portable, :email, :site_web, :institution_id, :genre_adresse, :genre_lettre, :created_at, :updated_at, :type_intervenant_id, :avocat_au_barreau, :notes, :contact_medium_id, :user_id, :parametres_cabinet_id
  
  def full_name
    [prenom, nom].join(' ')
  end
  
  def full_adresse
    [genre_adresse,full_name,adresse1,adresse2,adresse3,code_postal,ville ].join(' ')
  end


end