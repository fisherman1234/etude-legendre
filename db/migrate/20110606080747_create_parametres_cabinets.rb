class CreateParametresCabinets < ActiveRecord::Migration
  def self.up
    create_table :parametres_cabinets do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :parametres_cabinets
  end
end
