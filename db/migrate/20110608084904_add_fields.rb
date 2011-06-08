class AddFields < ActiveRecord::Migration
  def self.up
    add_column :parametres_cabinets, :en_tete_marge_haut, :integer
    add_column :parametres_cabinets, :en_tete_marge_gauche, :integer
    add_column :parametres_cabinets, :en_tete_marge_droite, :integer
    add_column :parametres_cabinets, :en_tete_marge_bas, :integer
                
  end

  def self.down
    remove_column :parametres_cabinets, :en_tete_marge_haut
    remove_column :parametres_cabinets, :en_tete_marge_gauche
    remove_column :parametres_cabinets, :en_tete_marge_droite
    remove_column :parametres_cabinets, :en_tete_marge_bas
  end
end
