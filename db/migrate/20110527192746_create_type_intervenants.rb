class CreateTypeIntervenants < ActiveRecord::Migration
  def self.up
    create_table :type_intervenants do |t|
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :type_intervenants
  end
end
