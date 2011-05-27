class CreateDossiers < ActiveRecord::Migration
  def self.up
    create_table :dossiers do |t|
      t.string :ref_cabinet
      t.string :nom_dossier
      
      t.date :date_decision
      t.date :date_avis_designation
      t.date :date_cible_depot_rapport
      t.date :date_effective_depot_raport
      
      t.string :numero_service_expertise
      t.string :numero_role_general
      
      t.integer :type_expertise_id
      t.integer :type_decision_id
      
      
      t.timestamps
    end
  end

  def self.down
    drop_table :dossiers
  end
end
