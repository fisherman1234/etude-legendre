class Institution < ActiveRecord::Base
  has_many :contacts
  has_many :contact_acteurs
  belongs_to :type_institution
  has_paper_trail
end
