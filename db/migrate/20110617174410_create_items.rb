class CreateItems < ActiveRecord::Migration
  def self.up
    create_table :items do |t|
      t.string :description
      t.integer :categorie_id
      t.float :prix_unitaire
      t.integer :taux_tva_id
      t.integer :unite_id
      
      t.timestamps
    end
  end

  def self.down
    drop_table :items
  end
end
