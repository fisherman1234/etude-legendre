
class Activite < ActiveRecord::Base
  has_many :documents, :through => :activite_to_documents
  has_many :consignations
  has_many :communications
  has_many :activite_to_documents
  belongs_to :dossier
  belongs_to :type_activite
  after_create :add_to_google_cal
  has_many :expenses
  
  accepts_nested_attributes_for :documents, 
                                  :allow_destroy => true 
                                  

  accepts_nested_attributes_for :consignations, 
                                :allow_destroy => true, 
                                :reject_if => :all_blank

                                
  accepts_nested_attributes_for :activite_to_documents, 
                                :allow_destroy => true
  
  def add_to_google_cal
    service = GCal4Ruby::Service.new
    service.authenticate("thibault.poisson.etude.legendre@gmail.com", "tomaterouge")
    calendar = service.calendars.first
    
    event = GCal4Ruby::Event.new(service)
     event.calendar = calendar
     event.title = "Dinner with Kate"
     event.start_time = Time.now
     event.end_time = Time.now+2*3600
     event.where = "Luigi's"
     event.reminder = [{:minutes => 15, :method => 'email'}]
     event.save
    
  end
  
  def total_expense
    total = 0
    self.expenses.each do |expense|
      total = total + expense.prix_unitaire * expense.quantite
    end
    return total.round(2)
  end
  
end
