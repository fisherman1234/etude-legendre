class AddSenderIdToDocuments < ActiveRecord::Migration
  def self.up
    add_column :documents, :contact_id, :integer
  end

  def self.down
    remove_column :documents, :contact_id
  end
end
