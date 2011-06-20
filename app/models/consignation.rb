class Consignation < ActiveRecord::Base
  belongs_to :dossier
  has_many :consignation_lines
  
  accepts_nested_attributes_for :consignation_lines, 
                                  :allow_destroy => true 
end
