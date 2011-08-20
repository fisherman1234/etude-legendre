class AddCategorieToTypeActivites < ActiveRecord::Migration
  def self.up
    add_column :type_activites, :categorie_id, :integer
  end

  def self.down
    remove_column :type_activites, :categorie_id
  end
end
