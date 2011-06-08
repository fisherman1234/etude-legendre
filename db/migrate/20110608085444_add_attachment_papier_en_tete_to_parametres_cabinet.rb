class AddAttachmentPapierEnTeteToParametresCabinet < ActiveRecord::Migration
  def self.up
    add_column :parametres_cabinets, :papier_en_tete_file_name, :string
    add_column :parametres_cabinets, :papier_en_tete_content_type, :string
    add_column :parametres_cabinets, :papier_en_tete_file_size, :integer
    add_column :parametres_cabinets, :papier_en_tete_updated_at, :datetime
  end

  def self.down
    remove_column :parametres_cabinets, :papier_en_tete_file_name
    remove_column :parametres_cabinets, :papier_en_tete_content_type
    remove_column :parametres_cabinets, :papier_en_tete_file_size
    remove_column :parametres_cabinets, :papier_en_tete_updated_at
  end
end
