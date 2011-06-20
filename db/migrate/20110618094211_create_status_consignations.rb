class CreateStatusConsignations < ActiveRecord::Migration
  def self.up
    create_table :status_consignations do |t|
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :status_consignations
  end
end
