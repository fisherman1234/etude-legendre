# encoding: utf-8
class ExportController < ApplicationController
  def partieList
    @dossier = Dossier.find(params[:id])
    Spreadsheet.client_encoding = 'UTF-8'
    
    book = Spreadsheet::Workbook.new
    sheet1 = book.create_worksheet
    sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    sheet1.row(3).push 'Partie/Type intervenant', "Role", 'Nom', "Prénom", "Entreprise", "Références", "Note", "Montant devis"
    k=0
    while k < 8
      sheet1.column(k).width = 20
      k = k+1
    end
    i = 4
    @dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteur|
        if contact_acteur.contact
            
            sheet1.row(i).push contact_acteur.acteur.description, contact_acteur.qualite_procedurale.description, contact_acteur.contact.try(:nom), contact_acteur.contact.try(:prenom), contact_acteur.contact.institution.try(:nom), contact_acteur.references, contact_acteur.notes, contact_acteur.montant_devis
            i +=1
        end
      end
    end
    book.write "#{RAILS_ROOT}/tmp/contacts.xls"
    send_file "#{RAILS_ROOT}/tmp/contacts.xls"
  end
  
  def documents
    @dossier = Dossier.find(params[:id])
    Spreadsheet.client_encoding = 'UTF-8'
    
    book = Spreadsheet::Workbook.new
    sheet1 = book.create_worksheet
    sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    sheet1.row(1).push 'Liste des documents'
    
    sheet1.row(3).push 'Description', "Nom du fichier", 'Taille', "Mise à jour", "Lien", "Emetteur", "Enregistré le"
    k=0
    while k < 8
      sheet1.column(k).width = 20
      k = k+1
    end
    i = 4
    @dossier.documents.each do |document|
      sheet1.row(i).push document.description, document.file_file_name, document.file_file_size.to_s, document.file_updated_at, document.generate_link, document.contact.full_name, document.created_at
      i=i+1
    end
    book.write "#{RAILS_ROOT}/tmp/documents.xls"
    send_file "#{RAILS_ROOT}/tmp/documents.xls"
  end
  
  def expenses
    @dossier = Dossier.find(params[:id])
    Spreadsheet.client_encoding = 'UTF-8'
    
    book = Spreadsheet::Workbook.new
    sheet1 = book.create_worksheet
    sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    sheet1.row(1).push 'Liste des dépenses'
    
    sheet1.row(3).push 'Activité', "Catégorie", 'Date', "Description", "Prix unitaire", "Quantité", "Unité", "Taux TVA", "Total HT"
    k=0
    while k < 8
      sheet1.column(k).width = 20
      k = k+1
    end
    i = 4
    @dossier.expenses.each do |expense|
      sheet1.row(i).push expense.activite.try(:description), expense.categorie.try(:description), expense.date_item, expense.description, expense.prix_unitaire, expense.quantite, expense.unite.try(:description), expense.taux_tva.description, expense.prix_unitaire*expense.quantite
      i=i+1
    end
    book.write "#{RAILS_ROOT}/tmp/expenses.xls"
    send_file "#{RAILS_ROOT}/tmp/expenses.xls"
  end
  
end
