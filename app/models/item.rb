class Item < ActiveRecord::Base
  belongs_to :taux_tva
  belongs_to :categorie
  belongs_to :unite
  belongs_to :parametres_cabinet
  
end
