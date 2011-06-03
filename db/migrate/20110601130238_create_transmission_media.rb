class CreateTransmissionMedia < ActiveRecord::Migration
  def self.up
    create_table :transmission_media do |t|
      t.string :description


      t.timestamps
    end
  end

  def self.down
    drop_table :transmission_media
  end
end
