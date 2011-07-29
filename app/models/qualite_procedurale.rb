class QualiteProcedurale < ActiveRecord::Base
  has_many :contact_acteurs
  has_paper_trail
  belongs_to :parametres_cabinet
  validates_presence_of :description
  
end
