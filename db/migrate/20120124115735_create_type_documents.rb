class CreateTypeDocuments < ActiveRecord::Migration
  def self.up
    create_table :type_documents do |t|
      t.string :description
      t.integer :parametres_cabinet_id

      t.timestamps
    end
  end

  def self.down
    drop_table :type_documents
  end
end
