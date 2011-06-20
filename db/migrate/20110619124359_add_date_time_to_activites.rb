class AddDateTimeToActivites < ActiveRecord::Migration
  def self.up
    remove_column :activites, :date_visite
    add_column :activites, :date_visite, :datetime
  end

  def self.down
    remove_column :activites, :date_visite
  end
end
