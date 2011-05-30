class TypeActeur < ActiveRecord::Base
  has_many :acteurs
  has_paper_trail 
end
