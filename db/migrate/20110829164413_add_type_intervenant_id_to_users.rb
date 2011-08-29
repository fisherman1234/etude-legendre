class AddTypeIntervenantIdToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :type_intervenant_id, :integer
  end

  def self.down
    remove_column :users, :type_intervenant_id
  end
end
