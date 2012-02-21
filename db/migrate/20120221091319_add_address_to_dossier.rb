class AddAddressToDossier < ActiveRecord::Migration
  def self.up
    add_column :dossiers, :adresse1, :string
    add_column :dossiers, :adresse2, :string
    add_column :dossiers, :adresse3, :string
    add_column :dossiers, :code_postal, :string
    add_column :dossiers, :ville, :string
    
  end

  def self.down
    remove_column :dossiers, :adresse1
    remove_column :dossiers, :adresse2
    remove_column :dossiers, :adresse3
    remove_column :dossiers, :code_postal
    remove_column :dossiers, :ville
    
  end
end
