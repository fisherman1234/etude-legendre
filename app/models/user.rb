class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :nom, :civilite, :prenom, :titre_lettres, :fonction, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :signature_lettres, :genre_adresse, :genre_lettre, :site_web, :parametres_cabinet_id
  
  belongs_to :parametres_cabinet
  
  liquid_methods :email, :nom, :civilite, :prenom, :titre_lettres, :fonction, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :signature_lettres, :genre_adresse, :genre_lettre, :site_web, :parametres_cabinet_id
  
  
  
end

