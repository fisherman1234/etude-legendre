class ChangementCivilite < ActiveRecord::Migration
  def self.up
    rename_column :contacts, :civilite, :civilite_id
  end

  def self.down
  end
end
