class Categorie < ActiveRecord::Base
  has_many :ligne_consignation_items
  belongs_to :parametres_cabinet
  belongs_to :taux_tva
end
