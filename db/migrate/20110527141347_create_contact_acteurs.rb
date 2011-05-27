class CreateContactActeurs < ActiveRecord::Migration
  def self.up
    create_table :contact_acteurs do |t|
      t.integer :qualite_procedurale_id
      t.integer :contact_id
      t.integer :acteur_id
      t.integer :institution_id

      t.timestamps
    end
  end

  def self.down
    drop_table :contact_acteurs
  end
end
