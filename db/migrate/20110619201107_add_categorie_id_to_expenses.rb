class AddCategorieIdToExpenses < ActiveRecord::Migration
  def self.up
    add_column :expenses, :categorie_id, :integer
  end

  def self.down
    remove_column :expenses, :categorie_id
  end
end
