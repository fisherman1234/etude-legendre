class AddRoleProcedureToContactActeurs < ActiveRecord::Migration
  def self.up
    add_column :contact_acteurs, :role_in_procedure, :string
  end

  def self.down
    remove_column :contact_acteurs, :role_in_procedure
  end
end
