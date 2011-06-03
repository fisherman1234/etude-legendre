class ActiviteToDocument < ActiveRecord::Base
  belongs_to :document
  belongs_to :activite
end
