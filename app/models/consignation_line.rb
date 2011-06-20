class ConsignationLine < ActiveRecord::Base
  belongs_to :dossier
  belongs_to :contact
  belongs_to :institution
  belongs_to :type_status_consignation
  belongs_to :consignation
end
