class Item < ActiveRecord::Base
  belongs_to :taux_tva
  belongs_to :categorie
  belongs_to :unite
end
