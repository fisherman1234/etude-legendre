class CreateExpenses < ActiveRecord::Migration
  def self.up
    create_table :expenses do |t|
      t.integer :consignation_id
      t.integer :item_id
      t.string :description
      t.float :prix_unitaire
      t.float :quantite
      t.date :date_item
      t.integer :taux_tva_id
      t.integer :unite_id
      t.datetime :created_at
      t.datetime :updated_at
      t.integer :dossier_id
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :expenses
  end
end
