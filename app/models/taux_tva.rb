class TauxTva < ActiveRecord::Base
  has_many :items
  has_many :ligne_consignation_items
  validates_presence_of :description, :taux
  
end
