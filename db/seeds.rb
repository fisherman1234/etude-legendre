# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
CodePostalVille.delete_all
open("http://dl.dropbox.com/u/8806/insee.csv") do |vehicles|  
  vehicles.read.each_line do |ville|  
    ville, cp, dpt, insee = ville.chomp.split(";")  
    CodePostalVille.create!(:code_postal => cp, :ville => ville)  
  end
end
TypeDecision.delete_all
TypeDecision.create(:description => "Ordonnance de référé") 
TypeDecision.create(:description => "Ordonnance du juge d'instruction")
TypeDecision.create(:description => "Rapport de consultant")
TypeDecision.create(:description => "Arrêt de la cour d'appel")
TypeDecision.create(:description => "Jugement")
TypeDecision.create(:description => "Ordonnance du juge de la mise en état")
TypeDecision.create(:description => "Réquisition du parquet")

TypeActeur.delete_all
TypeActeur.create(:description => "Tribunal")	
TypeActeur.create(:description => "Partie")	
TypeActeur.create(:description => "Co-experts")			
TypeActeur.create(:description => "Sapiteurs")		
TypeActeur.create(:description => "Huissiers")			
TypeActeur.create(:description => "Autres")			
TypeActeur.create(:description => "Cabinet")

TypeIntervenant.delete_all
TypeIntervenant.create(:description => "Juge")
TypeIntervenant.create(:description => "Avocat")
TypeIntervenant.create(:description => "Secrétaire")		
TypeIntervenant.create(:description => "Expert")

TypeActivite.delete_all
TypeActivite.create(:description => "Visite technique")	
TypeActivite.create(:description => "Accedit")
TypeActivite.create(:description => "Communication")
TypeActivite.create(:description => "Devis")
TypeActivite.create(:description => "Divers")

TypeEtatDossier.delete_all
TypeEtatDossier.create(:description => "Proposition reçue", :ordre_apparition =>	1)			
TypeEtatDossier.create(:description => "Mission acceptée", :ordre_apparition =>	2)		
TypeEtatDossier.create(:description => "Réunion planifiée", :ordre_apparition =>	3)
TypeEtatDossier.create(:description => "Réunion effectuée", :ordre_apparition =>	4)
TypeEtatDossier.create(:description => "Compte-rendu réunion rédigé et envoyé", :ordre_apparition =>	5)
TypeEtatDossier.create(:description => "Compte-rendu réunion accepté", :ordre_apparition =>	6)
TypeEtatDossier.create(:description => "Rapport provisoire envoyé", :ordre_apparition =>	7)
TypeEtatDossier.create(:description => "Rapport provisoire accepté", :ordre_apparition =>	8)
TypeEtatDossier.create(:description => "Rapport définitif envoyé", :ordre_apparition =>	9)
TypeEtatDossier.create(:description => "Rapport provisoire envoyé", :ordre_apparition =>	10)
TypeEtatDossier.create(:description => "Dossier clos", :ordre_apparition =>	11)

TypeExpertise.delete_all
TypeExpertise.create(:description => "Expertise technique")	
TypeExpertise.create(:description => "Expertise judiciaire")

TypeInstitution.delete_all
TypeInstitution.create(:description => "Tribunal")
TypeInstitution.create(:description => "Cabinet d'avocat")
TypeInstitution.create(:description => "Cabinet d'expert")
TypeInstitution.create(:description => "Société d'assurance")

QualiteProcedurale.delete_all
QualiteProcedurale.create(:description => "Juge controlleur")		
QualiteProcedurale.create(:description => "Juge mission")
QualiteProcedurale.create(:description => "Demandeur")	
QualiteProcedurale.create(:description => "Défendeur")		
QualiteProcedurale.create(:description => "Intervenant volontaire")		
QualiteProcedurale.create(:description => "Appelé en cause")
QualiteProcedurale.create(:description => "Autre")
QualiteProcedurale.create(:description => "Avocat")		
QualiteProcedurale.create(:description => "Assureur")			
QualiteProcedurale.create(:description => "Conseil technique")		
QualiteProcedurale.create(:description => "Sachant")		
QualiteProcedurale.create(:description => "Intervenant")
QualiteProcedurale.create(:description => "Expert")