class Expense < ActiveRecord::Base
  belongs_to :consignation
  belongs_to :item
  belongs_to :taux_tva
  belongs_to :unite
  belongs_to :user
  belongs_to :dossier
  belongs_to :activite
  belongs_to :categorie
  before_validation :set_defaults
  
  #validates_presence_of :description, :prix_unitaire, :quantite, :taux_tva_id

  attr_accessor :activite_name
  attr_accessor :total_ttc
  attr_accessor :total_ht

  def set_defaults
    write_attribute(:description, ' ') if description == nil
    write_attribute(:prix_unitaire, '0') if prix_unitaire == nil
    write_attribute(:quantite, '0') if quantite == nil
    write_attribute(:taux_tva_id, self.dossier.parametres_cabinet.taux_tvas.first.id) if taux_tva_id == nil
  end
  
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
