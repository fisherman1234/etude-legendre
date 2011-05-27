class CreateTypeActeurs < ActiveRecord::Migration
  def self.up
    create_table :type_acteurs do |t|
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :type_acteurs
  end
end
