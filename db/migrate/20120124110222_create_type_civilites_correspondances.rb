class CreateTypeCivilitesCorrespondances < ActiveRecord::Migration
  def self.up
    create_table :type_civilites_correspondances do |t|
      t.string :description
      t.integer :parametres_cabinet_id

      t.timestamps
    end
  end

  def self.down
    drop_table :type_civilites_correspondances
  end
end
