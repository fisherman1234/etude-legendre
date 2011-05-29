class AddDebutDesOperationsToDossier < ActiveRecord::Migration
  def self.up
    add_column :dossiers, :date_debut_op_theorique, :date
    add_column :dossiers, :date_debut_op_reelle, :date
  end

  def self.down
    remove_column :dossiers, :date_debut_op_reelle
    remove_column :dossiers, :date_debut_op_theorique
  end
end
