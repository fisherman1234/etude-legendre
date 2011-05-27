class Contact < ActiveRecord::Base
  has_many :contact_acteurs
  belongs_to :institution
end
