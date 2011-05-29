class CreateTypeFormuleAdresses < ActiveRecord::Migration
  def self.up
    create_table :type_formule_adresses do |t|
      t.string :description_adresse
      t.string :description_courier
      t.integer :type_intervenant_id
      t.integer :civilite_id

      t.timestamps
    end
  end

  def self.down
    drop_table :type_formule_adresses
  end
end
