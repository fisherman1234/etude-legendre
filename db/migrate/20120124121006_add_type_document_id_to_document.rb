class AddTypeDocumentIdToDocument < ActiveRecord::Migration
  def self.up
    add_column :documents, :type_document_id, :integer
  end

  def self.down
    remove_column :documents, :type_document_id
  end
end
