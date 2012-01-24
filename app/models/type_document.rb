class TypeDocument < ActiveRecord::Base
  belongs_to :parametres_cabinet
  validates_presence_of :description
  has_many :documents
end
