class CreateConsignations < ActiveRecord::Migration
  def self.up
    create_table :consignations do |t|
      t.integer :activite_id
      t.integer :is_private

      t.timestamps
    end
  end

  def self.down
    drop_table :consignations
  end
end
