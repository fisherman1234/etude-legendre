class TypeEtatDossier < ActiveRecord::Base
  has_paper_trail 
  belongs_to :parametres_cabinet
  validates_presence_of :description, :ordre_apparition
  
end
