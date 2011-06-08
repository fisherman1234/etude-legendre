class AddParametersToEtude < ActiveRecord::Migration
  def self.up
    add_column :parametres_cabinets, :nom_cabinet, :string
    add_column :parametres_cabinets, :adresse1, :string
    add_column :parametres_cabinets, :adresse2, :string
    add_column :parametres_cabinets, :adresse3, :string
    add_column :parametres_cabinets, :code_postal, :string
    add_column :parametres_cabinets, :ville, :string
    add_column :parametres_cabinets, :pays, :string
    add_column :parametres_cabinets, :telephone, :string
    add_column :parametres_cabinets, :fax, :string
    add_column :parametres_cabinets, :email, :string
    add_column :parametres_cabinets, :site_internet, :string
    add_column :parametres_cabinets, :en_tete_lettres, :text
    add_column :parametres_cabinets, :pied_page_lettres, :text
    add_column :parametres_cabinets, :marge_gauche_lettres, :text
    add_column :parametres_cabinets, :siret, :string
    add_column :parametres_cabinets, :naf, :string
        
    
    add_column :users, :nom, :string
    add_column :users, :civilite, :string
    add_column :users, :prenom, :string
    add_column :users, :titre_lettres, :string
    add_column :users, :fonction, :string
    add_column :users, :adresse1, :string
    add_column :users, :adresse2, :string
    add_column :users, :adresse3, :string
    add_column :users, :code_postal, :string
    add_column :users, :ville, :string
    add_column :users, :pays, :string
    add_column :users, :telephone, :string
    add_column :users, :fax, :string
    add_column :users, :signature_lettres, :text
    add_column :users, :genre_adresse, :string
    add_column :users, :genre_lettre, :string
    add_column :users, :site_web, :string
    add_column :users, :parametres_cabinet_id, :integer

    add_column :dossiers, :user_id, :integer
    add_column :dossiers, :parametres_cabinet_id, :integer
    
    
  end

  def self.down
    remove_column :parametres_cabinets, :nom_cabinet
    remove_column :parametres_cabinets, :adresse1
    remove_column :parametres_cabinets, :adresse2
    remove_column :parametres_cabinets, :adresse3
    remove_column :parametres_cabinets, :code_postal
    remove_column :parametres_cabinets, :ville
    remove_column :parametres_cabinets, :pays
    remove_column :parametres_cabinets, :telephone
    remove_column :parametres_cabinets, :fax
    remove_column :parametres_cabinets, :email
    remove_column :parametres_cabinets, :site_internet
    remove_column :parametres_cabinets, :en_tete_lettres
    remove_column :parametres_cabinets, :pied_page_lettres
    remove_column :parametres_cabinets, :marge_gauche_lettres
    remove_column :parametres_cabinets, :siret
    remove_column :parametres_cabinets, :naf

    remove_column :users, :nom
    remove_column :users, :civilite
    remove_column :users, :prenom
    remove_column :users, :titre_lettres
    remove_column :users, :fonction
    remove_column :users, :adresse1
    remove_column :users, :adresse2
    remove_column :users, :adresse3
    remove_column :users, :code_postal
    remove_column :users, :ville
    remove_column :users, :pays
    remove_column :users, :telephone
    remove_column :users, :fax
    remove_column :users, :signature_lettres
    remove_column :users, :genre_adresse
    remove_column :users, :genre_lettre
    remove_column :users, :site_web
    remove_column :users, :parametres_cabinet_id
    

    remove_column :dossiers, :user_id
    remove_column :dossiers, :parametres_cabinet_id
  end
end
