class AddAmountToConsignation < ActiveRecord::Migration
  def self.up
    add_column :consignations, :amount, :float
    add_column :consignations, :status, :string
  end

  def self.down
    remove_column :consignations, :status
    remove_column :consignations, :amount
  end
end
