class CreateTypeExpertises < ActiveRecord::Migration
  def self.up
    create_table :type_expertises do |t|
      t.string :description
      t.text :commentaires

      t.timestamps
    end
  end

  def self.down
    drop_table :type_expertises
  end
end
