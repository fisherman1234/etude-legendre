class AddLinkedActiviteIdToActivite < ActiveRecord::Migration
  def self.up
    add_column :activites, :linked_activite_id, :integer
  end

  def self.down
    remove_column :activites, :linked_activite_id
  end
end
