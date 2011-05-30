class ContactActeur < ActiveRecord::Base
  belongs_to :acteur
  belongs_to :contact
  belongs_to :institution
  belongs_to :qualite_procedurale
  has_paper_trail 
  
end
