class CreateTypeStatusConsignations < ActiveRecord::Migration
  def self.up
    create_table :type_status_consignations do |t|
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :type_status_consignations
  end
end
