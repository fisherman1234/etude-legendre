class StatusConsignation < ActiveRecord::Base
  belongs_to :parametres_cabinet
  validates_presence_of :description
  
end
