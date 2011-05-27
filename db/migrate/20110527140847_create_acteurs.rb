class CreateActeurs < ActiveRecord::Migration
  def self.up
    create_table :acteurs do |t|
      t.integer :type_acteur_id
      t.integer :dossier_id

      t.timestamps
    end
  end

  def self.down
    drop_table :acteurs
  end
end
