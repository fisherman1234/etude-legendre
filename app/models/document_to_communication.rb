class DocumentToCommunication < ActiveRecord::Base
  belongs_to :communication
  belongs_to :document
end
