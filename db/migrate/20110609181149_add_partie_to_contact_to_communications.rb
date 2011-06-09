class AddPartieToContactToCommunications < ActiveRecord::Migration
  def self.up
    add_column :contact_to_communications, :partie, :string
  end

  def self.down
    remove_column :ontact_to_communications, :partie
  end
end
