class MessageTemplatesTypeActeurs < ActiveRecord::Migration
  def self.up
    create_table 'message_templates_type_acteurs', :id => false do |t|
      t.column :type_acteur_id, :integer
      t.column :message_template_id, :integer
    end
  end

  def self.down
  end
end
