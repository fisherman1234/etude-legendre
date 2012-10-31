class User < ActiveRecord::Base
  before_update :update_contact
  before_create :update_contact

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :nom, :civilite, :prenom, :titre_lettres, :fonction, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :signature_lettres, :genre_adresse, :genre_lettre, :site_web, :parametres_cabinet_id, :type_intervenant_id

  belongs_to :parametres_cabinet
  has_many :contacts
  has_many :reminders
  has_many :dossiers
  attr_accessor :full_name, :nom_complet



  liquid_methods :email, :nom, :civilite, :prenom, :titre_lettres, :fonction, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :signature_lettres, :genre_adresse, :genre_lettre, :site_web, :parametres_cabinet_id

  def full_name
    return prenom.to_s+' '+nom.to_s
  end



  def update_contact
    contact = self.contacts.first
    if !contact
      contact = self.contacts.build
    end
    contact.nom = nom
    contact.civilite = civilite
    contact.email = email
    contact.prenom = prenom
    contact.adresse1 = adresse1
    contact.adresse2 = adresse2
    contact.adresse3 = adresse3
    contact.code_postal = code_postal
    contact.ville = ville
    contact.pays = pays
    contact.telephone = telephone
    contact.fax = fax
    contact.genre_adresse = genre_adresse
    contact.genre_lettre = genre_lettre
    contact.site_web = site_web
    contact.type_intervenant_id = type_intervenant_id
    contact.parametres_cabinet_id = parametres_cabinet_id
    contact.save
  end
end

