class DocumentToCommunication < ActiveRecord::Base
  belongs_to :contact
  belongs_to :document
end
