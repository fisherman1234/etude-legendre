class TypeDecision < ActiveRecord::Base
  has_many :dossiers
  has_paper_trail 
end
