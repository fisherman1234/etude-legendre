class CreateReminders < ActiveRecord::Migration
  def self.up
    create_table :reminders do |t|
      t.date :reminder_date
      t.string :description
      t.integer :activite_id
      t.integer :user_id
      t.integer :dossier_id

      t.timestamps
    end
  end

  def self.down
    drop_table :reminders
  end
end
