class CreateDocumentToCommunications < ActiveRecord::Migration
  def self.up
    create_table :document_to_communications do |t|
      t.integer :document_id
      t.integer :communication_id
      t.integer :included_in_communication

      t.timestamps
    end
  end

  def self.down
    drop_table :document_to_communications
  end
end
