class MessageTemplate < ActiveRecord::Base
  has_many :communications
  has_and_belongs_to_many :type_acteurs
end
