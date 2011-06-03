class CreateActiviteToDocuments < ActiveRecord::Migration
  def self.up
    create_table :activite_to_documents do |t|
      t.integer :document_id
      t.integer :activite_id

      t.timestamps
    end
  end

  def self.down
    drop_table :activite_to_documents
  end
end
