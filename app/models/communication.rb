class Communication < ActiveRecord::Base
  belongs_to :dossier
  belongs_to :message_template
  belongs_to :contact, :foreign_key => :sender_id
  has_many :documents, :through => :document_to_communications
  has_many :contacts, :through => :contact_to_communications
  has_many :contact_to_communications
  has_many :document_to_communications
  
  accepts_nested_attributes_for :contact_to_communications, 
                                :allow_destroy => true, 
                                :reject_if =>  proc { |attributes| attributes['transmission_medium_id']=="0"  }
                                
  accepts_nested_attributes_for :document_to_communications, 
                                :allow_destroy => true, 
                                :reject_if => proc { |attributes| attributes['included_in_communication']=="0" }
                                
  accepts_nested_attributes_for :documents, 
                                :allow_destroy => true, 
                                :reject_if => :all_blank
                                
                                
  liquid_methods :date_communication, :subject_id, :description
  
  def date_communication
    return I18n.localize(Communication.last.created_at, :format => "%e %B %Y")
  end
  
end
