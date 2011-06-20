class AddItemsToConsignations < ActiveRecord::Migration
  def self.up
    add_column :consignations, :dossier_id, :integer
    add_column :consignations, :user_id, :integer
    add_column :consignations, :contact_id, :integer
  end

  def self.down
    remove_column :consignations, :contact_id
    remove_column :consignations, :user_id
    remove_column :consignations, :dossier_id
  end
end
