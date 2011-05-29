class CreateTypeAdresses < ActiveRecord::Migration
  def self.up
    create_table :type_adresses do |t|
      t.string :description_adresse
      t.string :description_courrier
      t.integer :type_intervenant_id
      t.integer :civilite_id

      t.timestamps
    end
  end

  def self.down
    drop_table :type_adresses
  end
end
