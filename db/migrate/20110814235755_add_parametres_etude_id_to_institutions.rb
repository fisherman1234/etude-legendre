class AddParametresEtudeIdToInstitutions < ActiveRecord::Migration
  def self.up
    add_column :institutions, :parametres_etude_id, :integer
  end

  def self.down
    remove_column :institutions, :parametres_etude_id
  end
end
