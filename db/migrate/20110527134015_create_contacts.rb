class CreateContacts < ActiveRecord::Migration
  def self.up
    create_table :contacts do |t|
      t.string :nom
      t.string :prenom
      t.string :civilite
      t.string :adresse1
      t.string :adresse2
      t.string :adresse3
      t.string :code_postal
      t.string :ville
      t.string :pays
      t.string :telephone
      t.string :fax
      t.string :portable
      t.string :email
      t.string :site_web
      t.string :entreprise_id
      t.string :type_intervenant
      t.string :genre_adresse
      t.string :genre_lettre

      t.timestamps
    end
  end

  def self.down
    drop_table :contacts
  end
end
