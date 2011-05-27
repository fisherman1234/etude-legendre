class Acteur < ActiveRecord::Base
  belongs_to :dossier
  has_many :contact_acteurs
  belongs_to :type_acteur
end
