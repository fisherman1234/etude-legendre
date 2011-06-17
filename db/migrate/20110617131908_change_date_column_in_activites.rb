class ChangeDateColumnInActivites < ActiveRecord::Migration
  def self.up
    remove_column :activites, :date_visite
    add_column :activites, :date_visite, :date
  end

  def self.down
    remove_column :activites, :date_visite
  end
end
