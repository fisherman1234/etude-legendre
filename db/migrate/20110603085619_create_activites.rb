class CreateActivites < ActiveRecord::Migration
  def self.up
    create_table :activites do |t|
      t.integer :type_activite_id
      t.string :description
      t.integer :no_accedit
      t.integer :date_visite
      t.string :adresse1
      t.string :adresse2
      t.string :adresse3
      t.string :code_postal
      t.string :ville
      t.string :pays
      t.string :heure
      t.text :commentaires
      t.integer :is_confidentiel
      t.date :terme_date

      t.timestamps
    end
  end

  def self.down
    drop_table :activites
  end
end
