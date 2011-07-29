class TypeAdresse < ActiveRecord::Base
  has_paper_trail 
  belongs_to :parametres_cabinet
  belongs_to :civilite
  belongs_to :type_intervenant
end
