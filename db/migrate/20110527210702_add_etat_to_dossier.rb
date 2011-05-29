class AddEtatToDossier < ActiveRecord::Migration
  def self.up
    add_column :dossiers, :type_etat_dossier_id, :integer
  end

  def self.down
    remove_column :dossiers, :type_etat_dossier_id
  end
end
