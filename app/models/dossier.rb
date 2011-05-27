class Dossier < ActiveRecord::Base
  has_many :acteurs
  belongs_to :type_decision
  belongs_to :type_expertise
end
