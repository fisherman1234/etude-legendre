class TypeIntervenant < ActiveRecord::Base
  has_many :contacts
  has_paper_trail
end
