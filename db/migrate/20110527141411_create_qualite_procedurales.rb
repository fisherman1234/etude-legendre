class CreateQualiteProcedurales < ActiveRecord::Migration
  def self.up
    create_table :qualite_procedurales do |t|
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :qualite_procedurales
  end
end
