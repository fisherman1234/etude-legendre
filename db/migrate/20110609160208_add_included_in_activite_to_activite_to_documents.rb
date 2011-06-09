class AddIncludedInActiviteToActiviteToDocuments < ActiveRecord::Migration
  def self.up
    add_column :activite_to_documents, :included_in_activite, :integer
  end

  def self.down
    remove_column :activite_to_documents, :included_in_activite
  end
end
