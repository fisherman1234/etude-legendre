class AddMessageTemplateIdToTypeActivites < ActiveRecord::Migration
  def self.up
    add_column :type_activites, :message_template_id, :integer
  end

  def self.down
    remove_column :type_activites, :message_template_id
  end
end
