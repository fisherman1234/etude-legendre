class ContactActeur < ActiveRecord::Base
  belongs_to :acteur
  belongs_to :contact
  belongs_to :institution
end
