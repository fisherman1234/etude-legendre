class Contact < ActiveRecord::Base
  has_many :contact_acteurs, :dependent => :destroy
  belongs_to :institution
  belongs_to :user
  has_many :documents
  belongs_to :type_intervenant
  has_paper_trail 
  attr_accessor :nom_complet
  attr_accessor :full_name
  
  def full_name
    [prenom, nom].join(' ')
  end
  



end