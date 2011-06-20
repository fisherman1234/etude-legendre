class Unite < ActiveRecord::Base
  has_many :items
  has_many :ligne_consignations_items
end
