class TypeIntervenant < ActiveRecord::Base
  has_many :contacts
  has_paper_trail
  belongs_to :parametres_cabinet
  validates_presence_of :description
  
end
