class TypeInstitution < ActiveRecord::Base
  has_paper_trail
  has_many :institution
  belongs_to :parametres_cabinet
  validates_presence_of :description
  
end
