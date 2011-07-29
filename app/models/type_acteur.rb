class TypeActeur < ActiveRecord::Base
  has_many :acteurs
  has_paper_trail 
  has_and_belongs_to_many :message_templates
  belongs_to :parametres_cabinet
  validates_presence_of :description
end
