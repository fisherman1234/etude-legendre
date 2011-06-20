class AddDossierIdToLigneConsignationItems < ActiveRecord::Migration
  def self.up
    add_column :ligne_consignation_items, :dossier_id, :integer
    add_column :ligne_consignation_items, :user_id, :integer
  end

  def self.down
    remove_column :ligne_consignation_items, :user_id
    remove_column :ligne_consignation_items, :dossier_id
  end
end
