class AddDescriptionToMessageTemplates < ActiveRecord::Migration
  def self.up
    add_column :message_templates, :description, :string
  end

  def self.down
    remove_column :message_templates, :description
  end
end
