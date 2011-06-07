class Contact < ActiveRecord::Base
  has_many :contact_acteurs
  belongs_to :institution
  belongs_to :type_intervenant
  has_paper_trail 
  
  def full_name
    [prenom, nom].join(' ')
  end
  
  def dossiers
    self.contact_acteurs.map {|l| [l.acteur.dossier.try(ref_cabinet), l.acteur.dossier.try(nom_dossier), Institution.find(l.acteur.dossier.institution_id).try(:nom)] }
  end


end