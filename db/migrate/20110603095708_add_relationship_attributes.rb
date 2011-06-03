class AddRelationshipAttributes < ActiveRecord::Migration
  def self.up
    add_column :activites, :dossier_id, :integer
    add_column :communications, :activite_id, :integer
  end

  def self.down
    remove_column :activites, :dossier_id
    remove_column :communications, :activite_id
  end
end
