class RenameParamsCabinet < ActiveRecord::Migration
  def self.up
    rename_column :institutions, :parametres_etude_id, :parametres_cabinet_id
    
  end

  def self.down
  end
end
