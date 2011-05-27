class CreateInstitutions < ActiveRecord::Migration
  def self.up
    create_table :institutions do |t|
      t.string :nom
      t.string :type
      t.string :chambre
      t.string :telephone
      t.string :fax
      t.string :site_web
      t.string :commentaires

      t.timestamps
    end
  end

  def self.down
    drop_table :institutions
  end
end
