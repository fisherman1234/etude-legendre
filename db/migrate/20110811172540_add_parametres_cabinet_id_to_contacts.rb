class AddParametresCabinetIdToContacts < ActiveRecord::Migration
  def self.up
    add_column :contacts, :parametres_cabinet_id, :integer
  end

  def self.down
    remove_column :contacts, :parametres_cabinet_id
  end
end
