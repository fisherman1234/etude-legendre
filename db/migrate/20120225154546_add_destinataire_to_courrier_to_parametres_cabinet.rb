class AddDestinataireToCourrierToParametresCabinet < ActiveRecord::Migration
  def self.up
    add_column :parametres_cabinets, :add_destinataire_to_courrier, :boolean
  end

  def self.down
    remove_column :parametres_cabinets, :add_destinataire_to_courrier
  end
end
