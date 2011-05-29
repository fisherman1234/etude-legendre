class DropTypeAdresses < ActiveRecord::Migration
  def self.up
    drop_table :type_formule_adresses
    
  end

  def self.down
  end
end
