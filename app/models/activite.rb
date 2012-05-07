
class Activite < ActiveRecord::Base
  has_many :documents, :through => :activite_to_documents
  has_many :consignations
  has_many :communications, :dependent => :destroy
  has_many :activite_to_documents , :dependent => :destroy
  belongs_to :dossier
  belongs_to :type_activite
  has_many :expenses, :dependent => :destroy
  
  accepts_nested_attributes_for :documents, 
                                  :allow_destroy => true 
                                  

  accepts_nested_attributes_for :consignations, 
                                :allow_destroy => true, 
                                :reject_if => :all_blank

                                
  accepts_nested_attributes_for :activite_to_documents, 
                                :allow_destroy => true
  
  before_save :set_date
  
  liquid_methods :id, :type_activite_id, :description, :no_accedit, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :heure, :commentaires, :is_confidentiel, :terme_date, :created_at, :updated_at, :dossier_id, :message_template_id, :add_to_gcal, :date_visite
  
  def set_date
    if terme_date.nil?
      self.terme_date = Time.now.to_date
    end
  end
  
  def total_expense
    total = 0
    self.expenses.each do |expense|
      total = total + expense.prix_unitaire * expense.quantite
    end
    return total.round(2)
  end
  
end
