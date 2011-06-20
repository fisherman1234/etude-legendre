class Consignation < ActiveRecord::Base
  belongs_to :activite
  has_many :expenses
end
