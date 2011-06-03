class Activite < ActiveRecord::Base
  has_many :documents, :through => :activite_to_documents
  has_many :consignations
  has_many :communications
  has_many :activite_to_documents
  accepts_nested_attributes_for :documents, 
                                  :allow_destroy => true, 
                                  :reject_if => :all_blank

  accepts_nested_attributes_for :consignations, 
                                :allow_destroy => true, 
                                :reject_if => :all_blank

  accepts_nested_attributes_for :communications, 
                                :allow_destroy => true, 
                                :reject_if => :all_blank
end