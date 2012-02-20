class AddShortLinkToDocument < ActiveRecord::Migration
  def self.up
    add_column :documents, :short_link, :string
    add_column :documents, :long_link, :string

  end

  def self.down
    remove_column :documents, :short_link
    remove_column :documents, :long_link
  end
end
