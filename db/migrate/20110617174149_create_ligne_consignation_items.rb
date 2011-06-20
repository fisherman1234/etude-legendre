class CreateLigneConsignationItems < ActiveRecord::Migration
  def self.up
    create_table :ligne_consignation_items do |t|
      t.integer :consignation_id
      t.integer :item_id
      t.string :description
      t.float :prix_unitaire
      t.float :quantite
      t.date :date_item
      t.integer :taux_tva_id
      t.integer :unite_id

      t.timestamps
    end
  end

  def self.down
    drop_table :ligne_consignation_items
  end
end
