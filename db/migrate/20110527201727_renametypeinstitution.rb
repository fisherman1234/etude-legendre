class Renametypeinstitution < ActiveRecord::Migration
  def self.up
    remove_column :institutions, :type
    
    add_column :institutions, :type_institution_id, :integer
  end

  def self.down
    remove_column :institutions, :type_institution_id
  end
end
