# encoding: utf-8
require 'csv'
class ExportController < ApplicationController
  def partieList
    @dossier = Dossier.find(params[:id])
    Spreadsheet.client_encoding = 'UTF-8'
    
    book = Spreadsheet::Workbook.new
    sheet1 = book.create_worksheet
    sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    sheet1.row(3).push 'Nom', "Prénom", 'Adresse', "Téléphone", "Fax", "Mobile", "Email", "Qualité procédurale", "Rôle dans l'affaire"
    k=0
    while k < 8
      sheet1.column(k).width = 20
      k = k+1
    end
    i = 4
    @dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteur|
        if contact_acteur.contact

            
            sheet1.row(i).push contact_acteur.contact.try(:nom), contact_acteur.contact.try(:prenom), contact_acteur.contact.try(:geo_adresse), contact_acteur.contact.try(:telephone),contact_acteur.contact.try(:fax),contact_acteur.contact.try(:portable),contact_acteur.contact.try(:email), contact_acteur.qualite_procedurale.description, contact_acteur.role_in_procedure

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
    @cabinet_contacts_id_arry = @dossier.parametres_cabinet.users.collect{|l| l.contacts.collect {|u| u.id}}.flatten
    book = Spreadsheet::Workbook.new
    sheet1 = book.create_worksheet
    sheet1.name = "Documents reçus"
    
    sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    sheet1.row(1).push 'Liste des documents'
    sheet1.row(3).push 'Description', "Nom du fichier", 'Taille', "Mise à jour", "Lien", "Emetteur", "Enregistré le", "Type de document"
    k=0
    while k < 8
      sheet1.column(k).width = 20
      k = k+1
    end
    i = 4
    @dossier.documents.where(["contact_id not in (?)", @cabinet_contacts_id_arry]).sort_by{|l| [l.type_document.try(:description) || '']}.each do |document|
      sheet1.row(i).push document.description, document.file_file_name, document.file_file_size.to_s, document.file_updated_at, document.generate_link, document.contact.try(:full_name), document.created_at, document.type_document.try(:description)
      i=i+1
    end
    
    sheet2 = book.create_worksheet
    sheet2.name = "Documents émis par le cabinet"
    
    sheet2.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    sheet2.row(1).push 'Liste des documents'
    sheet2.row(3).push 'Description', "Nom du fichier", 'Taille', "Mise à jour", "Lien", "Emetteur", "Enregistré le", "Type de document"
    k=0
    while k < 8
      sheet2.column(k).width = 20
      k = k+1
    end
    i = 4
    @dossier.documents.where(["contact_id in (?)", @cabinet_contacts_id_arry]).sort_by{|l| [l.type_document.try(:description) ]}.each do |document|
      sheet2.row(i).push document.description, document.file_file_name, document.file_file_size.to_s, document.file_updated_at, document.generate_link, document.contact.try(:full_name), document.created_at, document.type_document.try(:description)
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
  
  def convocations
    @dossier = Dossier.find(params[:id])
    Spreadsheet.client_encoding = 'UTF-8'
    
    book = Spreadsheet::Workbook.new
    @activites = @dossier.activites
    @convocations = []
    @activites.each do |act|
      if act.type_activite.categorie_id == 2
        @convocations.push(act)
      end
    end
    sheet1 = book.create_worksheet
    sheet1.row(0).push 'Liste des convocations'
    
    sheet1.row(2).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    
    sheet1.row(4).push 'Type de convocation', "Date", 'Heure', "Adresse"
    
    k=0
    while k < 3
      sheet1.column(k).width = 20
      k = k+1
    end
    sheet1.column(k).width = 50
    i = 5
    @convocations.sort_by! { |a| [ a.terme_date || Time.now ]}.each do |convocation|
      sheet1.row(i).push convocation.type_activite.description, convocation.terme_date, convocation.heure, [convocation.adresse1, convocation.adresse2, convocation.adresse3, convocation.code_postal, convocation.ville].reject{|s| s.to_s.empty?}.join(' ')
      i=i+1
    end
    book.write "#{RAILS_ROOT}/tmp/convocations.xls"
    send_file "#{RAILS_ROOT}/tmp/convocations.xls"
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
    expenses.sort_by! { |a| [ a.item_id || 0 ]}.each do |expense|
      sheet1.row(i).push expense.categorie.try(:description), expense.date_item, expense.description, expense.prix_unitaire, expense.quantite, expense.unite.try(:description), expense.taux_tva.description, expense.prix_unitaire*expense.quantite
      i=i+1
    end
  end
  
  def synthesis_expenses_sheet(expenses, isDevis)
    
    @categ = Categorie.find(:all, :conditions => {:parametres_cabinet_id => @dossier.parametres_cabinet_id})
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
    sheet.row(3).push "Catégorie", 'Type',  "Total HT"
    @categ.sort_by(&:description).each do |categorie|
      categorie.items.find(:all, :conditions => {:parametres_cabinet_id => @dossier.parametres_cabinet_id}).sort_by(&:description).each do |item|
        expenses = grouped_expenses[item.id]
        total_ht = 0
        total_ttc = 0
        if expenses
          expenses.each do |expense|
            total_ht += expense.total
            total_ttc += expense.total_ttc
          end
        end
        sheet.row(i).push categorie.try(:description), item.try(:description), total_ht
        i+=1
      end
    end
        
    
  end
  
  
  def list_pieces
    @dossier = Dossier.find(params[:id])
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet::Workbook.new
    sheet1 = book.create_worksheet
    sheet1.name = "Pièces envoyées par les avocats"
    
    sheet1.row(0).push 'Dossier', @dossier.nom_dossier, 'Référence', @dossier.ref_cabinet
    sheet1.row(1).push 'Liste des documents'
    sheet1.row(3).push "Avocat", 'Numéro de pièce', "Nom du fichier", 'Taille', "Mise à jour", "Lien", "Enregistré le", "Type de document"
    k=0
    while k < 8
      sheet1.column(k).width = 20
      k = k+1
    end
    i = 4
    @dossier.documents.where(["contact_id in (?)", @dossier.avocats.collect{|l| l.id}]).sort_by!{|l| [l.contact_id, l.type_document.try(:description).to_s]}.each do |document|
      sheet1.row(i).push document.contact.try(:full_name), document.description, document.file_file_name, document.file_file_size.to_s, document.file_updated_at, document.generate_link,  document.created_at, document.type_document.try(:description)
      i=i+1
    end
    book.write "#{RAILS_ROOT}/tmp/list_pieces.xls"
    send_file "#{RAILS_ROOT}/tmp/list_pieces.xls"
  end
  
  #params[:model] in (User, Institution, Contact, Dossier)
  def export_cabinet
    @cabinet = ParametresCabinet.find(params[:id])
    send_file @cabinet.export_full
  end
  
  
  
end
