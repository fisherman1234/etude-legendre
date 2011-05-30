class QualiteProcedurale < ActiveRecord::Base
  has_many :contact_acteurs
  has_paper_trail 
end
