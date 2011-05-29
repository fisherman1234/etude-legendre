class RenommageColonneInstitution < ActiveRecord::Migration
  def self.up
    rename_column :contacts, :entreprise_id, :institution_id
  end

  def self.down
    rename_column :contacts, :institution_id, :entreprise_id
  end
end
