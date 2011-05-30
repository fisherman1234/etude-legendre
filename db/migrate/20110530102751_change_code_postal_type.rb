class ChangeCodePostalType < ActiveRecord::Migration
  def self.up
    remove_column :code_postal_villes, :code_postal
    add_column :code_postal_villes, :code_postal, :string
    add_index :code_postal_villes, :code_postal
    add_index :code_postal_villes, :ville
    
  end

  def self.down
    remove_column :code_postal_villes, :code_postal
    remove_index :code_postal_villes, :code_postal
    remove_index :code_postal_villes, :ville
    
  end
end
