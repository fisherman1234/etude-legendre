class ActivitesController < ApplicationController
  # GET /activites
  # GET /activites.xml
  uses_tiny_mce 
  
  def index
    @activites = Activite.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @activites }
    end
  end

  # GET /activites/1
  # GET /activites/1.xml
  def show
    @activite = Activite.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @activite }
    end
  end

  # GET /activites/new
  # GET /activites/new.xml
  def new
    @activite = Activite.new
    @documents=[]
    if params[:dossier]
      @activite.dossier_id = params[:dossier]
      @dossier = Dossier.find(params[:dossier])
        @dossier.documents.each do |document_item|
          @documents.push(document_item)
          activite_to_document = @activite.activite_to_documents.build(:document_id=>document_item.id)
        end
    end
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @activite }
    end
  end

  # GET /activites/1/edit
  def edit
    @activite = Activite.find(params[:id])
    @communication = @activite.communications.first
    @contacts = []
    @documents = []
    @activite.dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteurs|
        @contacts.push(contact_acteurs.contact)
      end
    end
  end

  # POST /activites
  # POST /activites.xml
  def create
    @activite = Activite.new(params[:activite])
    @dossier = Dossier.find(@activite.dossier_id)
    @template = []
    @communication =  @activite.communications.build
    @communication.sender_id = current_user.contacts.first.id
    @communication.dossier_id = @activite.dossier_id 
    
    @remove_actors = []
    @contacts = []
    
    if @activite.message_template_id
      @template = MessageTemplate.find(@activite.message_template_id)
      @communication.message_template_id = @activite.message_template_id
      @communication.letter_body = @template.letter_body
      @communication.subject_id = @template.mail_subject
      @communication.description = @template.message_body
      @activite.save
      @remove_actors = (TypeActeur.all - MessageTemplate.last.type_acteurs).map {|p| p.id}
    end
    
    
    
    @dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteurs|
        @transmission_medium_id = contact_acteurs.contact.contact_medium_id
        if @remove_actors.include?(acteur.type_acteur_id)
          @transmission_medium_id = 0
        end
        
        @contacts.push(contact_acteurs.contact)
        contact_to_communication = @communication.contact_to_communications.build(:partie=>acteur.description,:contact_id=>contact_acteurs.contact.id, :recipient => contact_acteurs.contact.prenom+' '+contact_acteurs.contact.nom,:transmission_medium_id => @transmission_medium_id, :adresse1=>contact_acteurs.contact.adresse1,:adresse2=>contact_acteurs.contact.adresse2, :adresse3=>contact_acteurs.contact.adresse3, :code_postal=>contact_acteurs.contact.code_postal, :ville => contact_acteurs.contact.ville, :pays=>contact_acteurs.contact.pays, :email=> contact_acteurs.contact.email, :fax=>contact_acteurs.contact.fax, :genre_adresse=>contact_acteurs.contact.genre_adresse, :genre_lettre=>contact_acteurs.contact.genre_lettre, :references_courrier=>contact_acteurs.references, :contact_acteur_id=>contact_acteurs.id)
      end
    end
    
    
    @activite.save
    @communication.save
    render :json => {"activite"=>@activite, "communication"=> @communication, "removable"=>@remove_actors}
  
  end

  # PUT /activites/1
  # PUT /activites/1.xml
  def update
    @activite = Activite.find(params[:id])

    
    respond_to do |format|
      if @activite.update_attributes(params[:activite])
        format.html { redirect_to(@activite, :notice => 'Activite was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @activite.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /activites/1
  # DELETE /activites/1.xml
  def destroy
    @activite = Activite.find(params[:id])
    @activite.destroy

    respond_to do |format|
      format.html { redirect_to(activites_url) }
      format.xml  { head :ok }
    end
  end
  
  def expenses
    @activite = Activite.find(params[:id])
    render :partial => 'expenses'
  end
end
