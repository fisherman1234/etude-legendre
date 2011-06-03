class CreateContactToCommunications < ActiveRecord::Migration
  def self.up
    create_table :contact_to_communications do |t|
      t.integer :contact_id
      t.integer :communication_id
      t.integer :transmission_medium_id
      t.string :recipient
      t.string :adresse1
      t.string :adresse2
      t.string :adresse3
      t.string :code_postal
      t.string :pays
      t.string :telephone
      t.string :email
      t.string :fax
      t.integer :doc_sent

      t.timestamps
    end
  end

  def self.down
    drop_table :contact_to_communications
  end
end
