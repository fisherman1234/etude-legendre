class CreateTypeActivites < ActiveRecord::Migration
  def self.up
    create_table :type_activites do |t|
      t.string :description
      t.timestamps
    end
  end

  def self.down
    drop_table :type_activites
  end
end
