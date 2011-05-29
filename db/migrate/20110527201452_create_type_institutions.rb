class CreateTypeInstitutions < ActiveRecord::Migration
  def self.up
    create_table :type_institutions do |t|
      t.string :description

      t.timestamps
    end
  end

  def self.down
    drop_table :type_institutions
  end
end
