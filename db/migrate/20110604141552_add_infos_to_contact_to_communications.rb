class AddInfosToContactToCommunications < ActiveRecord::Migration
  def self.up
    add_column :contact_to_communications, :communication_template_id, :integer
    add_column :contact_to_communications, :genre_lettre, :string
    add_column :contact_to_communications, :genre_adresse, :string
    add_column :contact_to_communications, :references_courrier, :string
    add_column :contact_to_communications, :ville, :string

  end

  def self.down
    remove_column :contact_to_communications, :references_courrier
    remove_column :contact_to_communications, :genre_adresse
    remove_column :contact_to_communications, :genre_lettre
    remove_column :contact_to_communications, :communication_template_id
    remove_column :contact_to_communications, :ville
    
  end
end
