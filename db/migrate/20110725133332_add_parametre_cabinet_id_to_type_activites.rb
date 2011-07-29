class AddParametreCabinetIdToTypeActivites < ActiveRecord::Migration
  def self.up
    add_column :type_adresses, :parametres_cabinet_id, :integer
    add_column :qualite_procedurales, :parametres_cabinet_id, :integer
    add_column :type_status_consignations, :parametres_cabinet_id, :integer
    add_column :type_acteurs, :parametres_cabinet_id, :integer
    add_column :type_activites, :parametres_cabinet_id, :integer
    add_column :type_decisions, :parametres_cabinet_id, :integer
    add_column :type_etat_dossiers, :parametres_cabinet_id, :integer
    add_column :type_expertises, :parametres_cabinet_id, :integer
    add_column :type_institutions, :parametres_cabinet_id, :integer

    add_column :type_intervenants, :parametres_cabinet_id, :integer
    
    
    add_column :unites, :parametres_cabinet_id, :integer
    add_column :taux_tvas, :parametres_cabinet_id, :integer
    
    add_column :items, :parametres_cabinet_id, :integer
    add_column :categories, :parametres_cabinet_id, :integer
  end

  def self.down
    remove_column :type_adresses, :parametre_cabinet_id
    remove_column :qualite_procedurales, :parametres_cabinet_id
    remove_column :type_status_consignations, :parametres_cabinet_id
    remove_column :type_acteurs, :parametres_cabinet_id
    remove_column :type_activites, :parametres_cabinet_id
    remove_column :type_decisions, :parametres_cabinet_id
    remove_column :type_etat_dossiers, :parametres_cabinet_id
    remove_column :type_expertises, :parametres_cabinet_id
    remove_column :type_institutions, :parametres_cabinet_id
    remove_column :type_intervenants, :parametres_cabinet_id

    remove_column :type_acteurs, :parametres_cabinet_id
    remove_column :unites, :parametres_cabinet_id
    remove_column :taux_tvas, :parametres_cabinet_id

    remove_column :items, :parametres_cabinet_id
    remove_column :categories, :parametres_cabinet_id
  end
end
