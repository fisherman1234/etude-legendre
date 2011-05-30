class AddInfosToContactActeurs < ActiveRecord::Migration
  def self.up
    add_column :contact_acteurs, :references, :string
    add_column :contact_acteurs, :notes, :text
    add_column :contact_acteurs, :montant_devis, :float
  end

  def self.down
    remove_column :contact_acteurs, :montant_devis
    remove_column :contact_acteurs, :notes
    remove_column :contact_acteurs, :references
  end
end
