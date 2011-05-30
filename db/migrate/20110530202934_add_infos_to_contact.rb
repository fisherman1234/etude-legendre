class AddInfosToContact < ActiveRecord::Migration
  def self.up
    add_column :contacts, :avocat_au_barreau, :string
    add_column :contacts, :notes, :text
  end

  def self.down
    remove_column :contacts, :notes
    remove_column :contacts, :avocat_au_barreau
  end
end
