# coding: utf-8

class DossiersController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /dossiers
  # GET /dossiers.xml
  def index
    
    if params[:term] != nil
      @dossiers = Dossier.find(:all, :conditions => ['id LIKE :search OR LOWER(ref_cabinet) LIKE LOWER(:search) OR LOWER(nom_dossier) LIKE LOWER(:search)', {:search => "%#{params[:term]}%"}])
    else
      @dossiers = current_user.parametres_cabinet.dossiers
    end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @dossiers }
      format.js {render :json => @dossiers.map {|p| {  :label => p.try(:ref_cabinet)+' '+p.try(:nom_dossier)  , :value => p.id}} }
      format.json {render :json => {"success"=>true,"data"=>@dossiers.map {|p| p.attributes.merge(:institution_nom => p.institution.nom, :type_etat_dossier_description => p.type_etat_dossier.try(:description), :juge_mission_id => p.juge_mission.try(:contact_id), :juge_controlleur_id => p.juge_controlleur.try(:contact_id))}}} 

    end
  end

  # GET /dossiers/1
  # GET /dossiers/1.xml
  def show
    @dossier = Dossier.find(params[:id])
    @acteurs = @dossier.acteurs
    @contact_acteurs = []
    tree = []
    @acteurs.each do |acteur|
      content = {:expanded => true, :cls => "folder", :id => acteur.id, :text => acteur.description, :qualite_procedurale => '', :institution=>'', :email => '', :telephone => ''}
      contact_acteurs = []
      acteur.contact_acteurs.each do |conact|
        @contact_acteurs.push(conact)
        if conact.contact
          contact_content = {:id => conact.id, :text => conact.contact.full_name, :qualite_procedurale => conact.qualite_procedurale.try(:description), :institution=>conact.contact.institution.try(:nom), :email => conact.contact.try(:email), :telephone => conact.contact.try(:telephone), :leaf => true}
          contact_acteurs.push(contact_content)
        end
      end
      content[:children] = contact_acteurs
      tree.push(content)
    end
    

    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @dossier }
      format.json { render :json => {:dossier => @dossier.attributes.merge(:institution_nom => @dossier.institution.nom, :type_etat_dossier_description => @dossier.type_etat_dossier.try(:description), :juge_mission_id => @dossier.juge_mission.try(:contact_id), :juge_controlleur_id => @dossier.juge_controlleur.try(:contact_id)), :activites => @dossier.activites, :expenses => @dossier.expenses, :reminders => @dossier.reminders, :documents => @dossier.documents, :acteurs =>@acteurs, :communications => @dossier.communications, :contact_acteurs=>@contact_acteurs, :tree => tree}}
      format.pdf {
        html = render_to_string( :action => "show")
        kit = PDFKit.new(html,  :page_size => 'A4')
        kit = kit.to_pdf
        send_data(kit, :filename => "labels.pdf", :type => 'application/pdf', :disposition => 'inline')
        return
      }
    end
  end

  # GET /dossiers/new
  # GET /dossiers/new.xml
  def new
    @dossier = Dossier.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @dossier }
    end
  end

  # GET /dossiers/1/edit
  def edit
    @dossier = Dossier.find(params[:id])
  end

  # POST /dossiers
  # POST /dossiers.xml
  def create
    @dossier = Dossier.new(params[:dossier])
    @dossier.parametres_cabinet_id = current_user.parametres_cabinet_id
    respond_to do |format|
      if @dossier.save
        format.html { redirect_to(@dossier, :notice => 'Le dossier a bien été créé') }
        format.xml  { render :xml => @dossier, :status => :created, :location => @dossier }
        format.json  { render :json => { :success => true, :message => "Updated Dossier #{@dossier.id}", :data => @dossier.attributes.merge(:institution_nom => @dossier.institution.nom, :type_etat_dossier_description => @dossier.type_etat_dossier.try(:description), :juge_mission_id => @dossier.juge_mission.try(:contact_id), :juge_controlleur_id => @dossier.juge_controlleur.try(:contact_id))}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @dossier.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dossiers/1
  # PUT /dossiers/1.xml
  def update
    @dossier = Dossier.find(params[:id])
    
    respond_to do |format|
      if @dossier.update_attributes(params[:dossier])
        format.html { redirect_to(@dossier, :notice => 'Dossier was successfully updated.') }
        format.xml  { head :ok }
        format.json  { render :json => { :success => true, :message => "Updated Dossier #{@dossier.id}", :data => @dossier.attributes.merge(:institution_nom => @dossier.institution.nom, :type_etat_dossier_description => @dossier.type_etat_dossier.try(:description), :juge_mission_id => @dossier.juge_mission.try(:contact_id), :juge_controlleur_id => @dossier.juge_controlleur.try(:contact_id))}}
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @dossier.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dossiers/1
  # DELETE /dossiers/1.xml
  def destroy
    @dossier = Dossier.find(params[:id])
    @dossier.destroy

    respond_to do |format|
      format.html { redirect_to("/") }
      format.xml  { head :ok }
    end
  end
  
  # GET /dossiers/1/new_partie
  def new_partie
    @dossier = Dossier.find(params[:id])

    respond_to do |format|
      format.html # new_partie.html.erb
    end
  end
  
  
  # GET /dossiers/1/new_communication
  def new_communication
    @dossier = Dossier.find(params[:id])
    @communication = Communication.new(:dossier_id=>params[:id])
    @contacts = []
    @documents = []
    @dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteurs|
        @contacts.push(contact_acteurs.contact)
        contact_to_communication = @communication.contact_to_communications.build(:partie=>acteur.description,:contact_id=>contact_acteurs.contact.id, :recipient => contact_acteurs.contact.prenom+' '+contact_acteurs.contact.nom,:transmission_medium_id => contact_acteurs.contact.contact_medium_id, :adresse1=>contact_acteurs.contact.adresse1,:adresse2=>contact_acteurs.contact.adresse2, :adresse3=>contact_acteurs.contact.adresse3, :code_postal=>contact_acteurs.contact.code_postal, :ville => contact_acteurs.contact.ville, :pays=>contact_acteurs.contact.pays, :email=> contact_acteurs.contact.email, :fax=>contact_acteurs.contact.fax, :genre_adresse=>contact_acteurs.contact.genre_adresse, :genre_lettre=>contact_acteurs.contact.genre_lettre, :references_courrier=>contact_acteurs.references)
      end
    end
    @dossier.documents.each do |document_item|
        @documents.push(document_item)
        document_to_communication = @communication.document_to_communications.build(:document_id=>document_item.id)
    end
    respond_to do |format|
      format.html # new_communication.html.erb
    end
  end
  
  # GET /dossiers/1/acteurs.js
  def acteurs
    @dossier = Dossier.find(params[:id])
    @result = []
    @dossier.acteurs.where(:type_acteur_id => 2).each do |acteur|
      acteur.contact_acteurs.each do |contact_acteur|
        if contact_acteur.contact
            @result.push([contact_acteur.acteur.description, contact_acteur.qualite_procedurale.description, contact_acteur.contact.try(:nom), contact_acteur.contact.try(:prenom), contact_acteur.contact.institution.try(:nom), contact_acteur.id])
        end
      end
    end
    
    respond_to do |format|
        format.js  { render :json => {"aaData"=>@result}}
    end
  end
  
  def documents
    @dossier = Dossier.find(params[:id])
    @documents = []
    @dossier.documents.each do |document|
      @documents.push([document.description, document.file_file_name, document.file_file_size.to_s, document.file_updated_at, document.id, "<a href="+document.generate_long_link+">Lien</a>"])
    end
    
    respond_to do |format|
        format.js  { render :json => {"aaData"=>@documents}}
    end
  end
  
  
  def activites
    @dossier = Dossier.find(params[:id])
    @activites = []
    @dossier.activites.each do |activite|
      expense = '&nbsp;'
      if !activite.expenses.empty?
        expense = '<span class="ui-button-icon-primary ui-icon ui-icon-calculator"></span>'
      end
      documents = '&nbsp;'
      if !activite.activite_to_documents.where(:included_in_activite => 1).empty?
        documents = '<span class="ui-button-icon-primary ui-icon ui-icon-document"></span>'
      end
      date = ''
      if activite.date_visite
        date = activite.date_visite.strftime('%d/%m/%Y - %H:%M')
      end
      @activites.push([date, activite.type_activite.try(:description), activite.description, documents, expense, activite.id ])
    end
    
    respond_to do |format|
        format.js  { render :json => {"aaData"=>@activites}}
    end
  end
  
  def frais
    @dossier = Dossier.find(params[:id])
    @expenses = []
    @dossier.expenses.each do |expense|
      
      @expenses.push([expense.activite.try(:description).to_s, expense.item.try(:description).to_s, expense.date_item.to_s, expense.description.to_s, expense.prix_unitaire.to_s,  expense.quantite.to_s,expense.unite.try(:description).to_s, expense.taux_tva.try(:description).to_s, expense.total.to_s, expense.id])
    end
    
    respond_to do |format|
        format.js  { render :json => {"aaData"=>@expenses}}
    end
  end
  
  
  def consignations
    @dossier = Dossier.find(params[:id])
    @consignations = []
    @dossier.consignations.each do |consignation|
      
      @consignations.push([
          consignation.description, 
          consignation.consignation_lines.where(:type_status_consignation_id => 1).first.try(:montant), 
          consignation.consignation_lines.where(:type_status_consignation_id => 2).first.try(:montant), 
          consignation.consignation_lines.where(:type_status_consignation_id => 3).first.try(:montant), 
          consignation.consignation_lines.where(:type_status_consignation_id => 4).first.try(:montant), 
          consignation.consignation_lines.where(:type_status_consignation_id => 5).first.try(:montant), 
          consignation.id
        ])
    end
    
    respond_to do |format|
        format.js  { render :json => {"aaData"=>@consignations}}
    end
  end
  
  def recap_frais
    @dossier = Dossier.find(params[:id])
    @expenses = @dossier.expenses
    render
  end
  
  def recap_frais_full
    @dossier = Dossier.find(params[:id])
    @expenses = @dossier.expenses
    render
  end
  
  def encours_frais
    @dossier = Dossier.find(params[:id])
    render :partial => 'encours_frais'
  end
end
