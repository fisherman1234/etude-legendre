class Reminder < ActiveRecord::Base
  belongs_to :user
  belongs_to :dossier
  belongs_to :activite
  validates_presence_of :reminder_date
end
