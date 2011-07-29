class Unite < ActiveRecord::Base
  has_many :items
  has_many :ligne_consignations_items
  belongs_to :parametres_cabinet
  validates_presence_of :description
  
end
