class AddContactActeurToContactToCommunications < ActiveRecord::Migration
  def self.up
    add_column :contact_to_communications, :contact_acteur_id, :integer
  end

  def self.down
    remove_column :contact_to_communications, :contact_acteur_id
  end
end
