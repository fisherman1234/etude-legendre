class Dossier < ActiveRecord::Base
  has_many :acteurs
  belongs_to :type_decision
  belongs_to :type_expertise
  after_create :create_actors
  
  def institution_id=(institution_id)
    write_attribute(:institution_id, institution_id)
    a = self.acteurs.find_or_initialize_by_type_acteur_id(1)
    a.type_acteur_id = 1
    a.description = Institution.find(institution_id).nom
    a.save
  end
  
  def create_actors
    Acteur.create(:type_acteur_id => 3, :dossier_id => self.id, :description => TypeActeur.find(3).description)
    Acteur.create(:type_acteur_id => 4, :dossier_id => self.id, :description => TypeActeur.find(4).description)
    Acteur.create(:type_acteur_id => 5, :dossier_id => self.id, :description => TypeActeur.find(5).description)
    Acteur.create(:type_acteur_id => 6, :dossier_id => self.id, :description => TypeActeur.find(6).description)
  end
  
  def acteur_tribunal
    self.acteurs.find(:first, :conditions => {:type_acteur_id => 1})
  end
  
  def juge_mission
    self.acteur_tribunal.contact_acteurs.find(:first, :conditions => {:qualite_procedurale_id => 2})
  end
  
  def juge_controlleur
    self.acteur_tribunal.contact_acteurs.find(:first, :conditions => {:qualite_procedurale_id => 1})
  end
    
  
  def juges=(juges)
    a = self.acteur_tribunal
    if a == nil
      b = self.acteurs.build(:type_acteur_id => 1)
      b.contact_acteurs.build(:qualite_procedurale_id => 2, :contact_id => juges["juge_mission_id"])
      b.contact_acteurs.build(:qualite_procedurale_id => 1, :contact_id => juges["juge_controlleur_id"])
    else
      self.acteur_tribunal.contact_acteurs.find_or_initialize_by_qualite_procedurale_id(2).update_attribute(:contact_id, juges["juge_mission_id"])
      self.acteur_tribunal.contact_acteurs.find_or_initialize_by_qualite_procedurale_id(1).update_attribute(:contact_id, juges["juge_controlleur_id"])
    end
  end
    
end
