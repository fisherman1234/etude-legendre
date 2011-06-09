class AddMessageTemplateIdToActivites < ActiveRecord::Migration
  def self.up
    add_column :activites, :message_template_id, :integer
  end

  def self.down
    remove_column :activites, :message_template_id
  end
end
