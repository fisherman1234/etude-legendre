class RemoveTypeIntervenantfromcontacts < ActiveRecord::Migration
  def self.up
    remove_column :contacts, :type_intervenant
    add_column :contacts, :type_intervenant_id, :integer
  end

  def self.down
    remove_column :contacts, :type_intervenant_id
  end
end
