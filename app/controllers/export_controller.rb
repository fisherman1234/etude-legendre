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
    
    @book = Spreadsheet::Workbook.new
    synthesis_expenses_sheet(@dossier.expenses, false)
    full_expenses_sheet(@dossier.expenses, false)
    
    @book.write "#{RAILS_ROOT}/tmp/expenses.xls"
    send_file "#{RAILS_ROOT}/tmp/expenses.xls"
  end
  
  def quote
    @activite = Activite.find(params[:id])
    @dossier = @activite.dossier
    Spreadsheet.client_encoding = 'UTF-8'
    
    @book = Spreadsheet::Workbook.new
    synthesis_expenses_sheet(@activite.expenses, true)
    full_expenses_sheet(@activite.expenses, true)
    @book.write "#{RAILS_ROOT}/tmp/quote.xls"
    send_file "#{RAILS_ROOT}/tmp/quote.xls"
  end
  
  def full_expenses_sheet(expenses, isDevis)
    sheet1 = @book.create_worksheet(:name => "Liste complète")
    sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    if isDevis == true
      sheet1.row(1).push 'Devis', @activite.try(:description)
    end
    
    sheet1.row(3).push "Catégorie", 'Date', "Description", "Prix unitaire", "Quantité", "Unité", "Taux TVA", "Total HT"
    k=0
    while k < 8
      sheet1.column(k).width = 20
      k = k+1
    end
    i = 4
    expenses.sort_by(&:item_id).each do |expense|
      sheet1.row(i).push expense.categorie.try(:description), expense.date_item, expense.description, expense.prix_unitaire, expense.quantite, expense.unite.try(:description), expense.taux_tva.description, expense.prix_unitaire*expense.quantite
      i=i+1
    end
  end
  
  def synthesis_expenses_sheet(expenses, isDevis)
    @categories = Categorie.all
    grouped_expenses = expenses.group_by(&:item_id)
    
    sheet = @book.create_worksheet(:name => "Synthèse")
    sheet.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    if isDevis == true
      sheet.row(1).push 'Devis', @activite.try(:description)
    end
    k=0
    while k < 8
      sheet.column(k).width = 20
      k = k+1
    end
    i = 4
    sheet.row(3).push "Catégorie", 'Type',  "Total HT", "Taux TVA", "Total TTC"
    @categories.sort_by(&:description).each do |categorie|
      categorie.items.sort_by(&:description).each do |item|
        expenses = grouped_expenses[item.id]
        total_ht = 0
        total_ttc = 0
        if expenses
          expenses.each do |expense|
            total_ht += expense.total
            total_ttc += expense.total_ttc
          end
        end
        sheet.row(i).push categorie.try(:description), item.try(:description), total_ht, item.taux_tva.description, total_ttc
        i+=1
      end
    end
        
    
  end
  
end
