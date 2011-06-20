class CreateTauxTvas < ActiveRecord::Migration
  def self.up
    create_table :taux_tvas do |t|
      t.string :description
      t.float :taux

      t.timestamps
    end
  end

  def self.down
    drop_table :taux_tvas
  end
end
