class ChangeColumnInstitutionTypeForContact < ActiveRecord::Migration
  def self.up
    change_table :contacts do |t|
          t.change :institution_id, :integer
        end
  end

  def self.down
  end
end
