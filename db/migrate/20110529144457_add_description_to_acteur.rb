class AddDescriptionToActeur < ActiveRecord::Migration
  def self.up
    add_column :acteurs, :description, :string
  end

  def self.down
    remove_column :acteurs, :description
  end
end
