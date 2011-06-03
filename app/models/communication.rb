class Communication < ActiveRecord::Base
  belongs_to :dossier
  belongs_to :contact, :foreign_key => :sender_id
  has_many :documents, :through => :document_to_communications
  has_many :contacts, :through => :contact_to_communications
end
