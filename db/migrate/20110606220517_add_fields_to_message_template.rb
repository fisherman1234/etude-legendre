class AddFieldsToMessageTemplate < ActiveRecord::Migration
  def self.up
    add_column :message_templates, :mail_subject, :string
    add_column :message_templates, :letter_body, :text
  end

  def self.down
    remove_column :message_templates, :letter_body
    remove_column :message_templates, :mail_subject
  end
end
