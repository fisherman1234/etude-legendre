class AddJuridictionToDossier < ActiveRecord::Migration
  def self.up
    add_column :dossiers, :institution_id, :integer
  end

  def self.down
    remove_column :dossiers, :institution_id
  end
end
