class AddParametresCabinetIdToMessageTemplates < ActiveRecord::Migration
  def self.up
    add_column :message_templates, :parametres_cabinet_id, :integer
  end

  def self.down
    remove_column :message_templates, :parametres_cabinet_id
  end
end
