class CreateDropTypeAdresses < ActiveRecord::Migration
  def self.up
    create_table :drop_type_adresses do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :drop_type_adresses
  end
end
