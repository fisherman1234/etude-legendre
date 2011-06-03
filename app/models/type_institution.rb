class TypeInstitution < ActiveRecord::Base
  has_paper_trail
  has_many :institution
end
