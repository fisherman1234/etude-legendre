class AddStatusToCommunications < ActiveRecord::Migration
  def self.up
    add_column :communications, :is_doc_generated, :integer
    add_column :communications, :is_sent, :integer
  end

  def self.down
    remove_column :communications, :is_sent
    remove_column :communications, :is_doc_generated
  end
end
