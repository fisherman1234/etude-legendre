class CreateConsignationLines < ActiveRecord::Migration
  def self.up
    create_table :consignation_lines do |t|
      t.integer :contact_id
      t.integer :institution_id
      t.float :montant
      t.date :date_consignation
      t.date :terme_consignation
      t.integer :type_status_consignation_id
      t.integer :consignation_id

      t.timestamps
    end
    add_column :consignations, :description, :string
  end

  def self.down
    drop_table :consignation_lines
    remove_column :consignations, :description
  end
end
