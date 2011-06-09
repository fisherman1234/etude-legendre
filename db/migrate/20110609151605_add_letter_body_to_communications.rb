class AddLetterBodyToCommunications < ActiveRecord::Migration
  def self.up
    add_column :communications, :letter_body, :text
  end

  def self.down
    remove_column :communications, :letter_body
  end
end
