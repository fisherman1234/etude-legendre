class CreateCommunications < ActiveRecord::Migration
  def self.up
    create_table :communications do |t|
      t.integer :sender_id
      t.integer :dossier_id
      t.string :subject_id
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :communications
  end
end
