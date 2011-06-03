class ContactToCommunication < ActiveRecord::Base
  belongs_to :contact
  belongs_to :communication
  
end
