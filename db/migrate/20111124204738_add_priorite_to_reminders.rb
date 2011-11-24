class AddPrioriteToReminders < ActiveRecord::Migration
  def self.up
    add_column :reminders, :priorite, :string
  end

  def self.down
    remove_column :reminders, :priorite
  end
end
