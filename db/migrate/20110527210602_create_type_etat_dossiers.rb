class CreateTypeEtatDossiers < ActiveRecord::Migration
  def self.up
    create_table :type_etat_dossiers do |t|
      t.string :description
      t.integer :ordre_apparition

      t.timestamps
    end
  end

  def self.down
    drop_table :type_etat_dossiers
  end
end
