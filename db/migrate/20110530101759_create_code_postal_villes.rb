class CreateCodePostalVilles < ActiveRecord::Migration
  def self.up
    create_table :code_postal_villes do |t|
      t.integer :code_postal
      t.string :ville

      t.timestamps
    end
  end

  def self.down
    drop_table :code_postal_villes
  end
end
