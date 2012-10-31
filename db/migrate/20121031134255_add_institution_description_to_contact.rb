class AddInstitutionDescriptionToContact < ActiveRecord::Migration
  def self.up
    add_column :contacts, :institution_description, :string
  end

  def self.down
    remove_column :contacts, :institution_description
  end
end