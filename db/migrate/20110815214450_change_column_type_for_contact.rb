class ChangeColumnTypeForContact < ActiveRecord::Migration
  def self.up
    change_table :contacts do |t|
          t.change :civilite, :integer
        end
  end

  def self.down
  end
end
