class Contact < ActiveRecord::Base
  has_many :contact_acteurs
  belongs_to :institution
  belongs_to :user
  belongs_to :type_intervenant
  has_paper_trail 
  
  def full_name
    [prenom, nom].join(' ')
  end
  



end