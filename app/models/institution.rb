class Institution < ActiveRecord::Base
  has_many :contacts
  has_many :contact_acteurs
  has_paper_trail 
end
