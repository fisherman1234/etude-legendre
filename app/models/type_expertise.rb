class TypeExpertise < ActiveRecord::Base
  has_many :dossiers
  has_paper_trail 
  belongs_to :parametres_cabinet
  validates_presence_of :description
  
end
