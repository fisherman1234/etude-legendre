class Expense < ActiveRecord::Base
  belongs_to :consignation
  belongs_to :item
  belongs_to :taux_tva
  belongs_to :unite
  belongs_to :user
  belongs_to :dossier
  belongs_to :activite
  belongs_to :categorie
  
  def total
    if !prix_unitaire.to_s.empty? && !quantite.to_s.empty?
      return (prix_unitaire*quantite).round(2)
    end
  end
  
  def total_tva
    return (self.total*self.taux_tva.taux/100).round(2)
  end
  
  def total_ttc
    return (self.total + self.total_tva).round(2)
  end

end
