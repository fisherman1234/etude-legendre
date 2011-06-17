class AddToGcalToActivites < ActiveRecord::Migration
  def self.up
    add_column :activites, :add_to_gcal, :integer
  end

  def self.down
    remove_column :activites, :add_to_gcal
  end
end
