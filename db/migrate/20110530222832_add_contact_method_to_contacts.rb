class AddContactMethodToContacts < ActiveRecord::Migration
  def self.up
    add_column :contacts, :contact_medium_id, :integer
  end

  def self.down
    remove_column :contacts, :contact_medium_id
  end
end
