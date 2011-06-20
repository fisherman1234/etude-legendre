class AddActiviteIdToExpenses < ActiveRecord::Migration
  def self.up
    add_column :expenses, :activite_id, :integer
  end

  def self.down
    remove_column :expenses, :activite_id
  end
end
