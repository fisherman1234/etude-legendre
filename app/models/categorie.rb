class Categorie < ActiveRecord::Base
  has_many :ligne_consignation_items
  has_many :categories
end
