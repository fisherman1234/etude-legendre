# coding: utf-8

class DossiersController < ApplicationController
  # GET /dossiers
  # GET /dossiers.xml
  def index
    if params[:term] != nil
      @dossiers = Dossier.find(:all, :conditions => ['id LIKE :search OR LOWER(ref_cabinet) LIKE LOWER(:search) OR LOWER(nom_dossier) LIKE LOWER(:search)', {:search => "%#{params[:term]}%"}])
    else
      @dossiers = Dossier.all
    end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @dossiers }
      format.js {render :json => @dossiers.map {|p| {  :label => p.try(:ref_cabinet)+' '+p.try(:nom_dossier)  , :value => p.id}} }
    end
  end

  # GET /dossiers/1
  # GET /dossiers/1.xml
  def show
    @dossier = Dossier.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @dossier }
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

    respond_to do |format|
      if @dossier.save
        format.html { redirect_to(@dossier, :notice => 'Le dossier a bien été créé') }
        format.xml  { render :xml => @dossier, :status => :created, :location => @dossier }
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
      format.html { redirect_to(dossiers_url) }
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
    @dossier.acteurs.each do |acteur|
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
      @documents.push([document.description, document.file_file_name, document.file_file_size.to_s, document.file_updated_at, document.id, "<a href="+document.file.url+">Lien</a>"])
    end
    
    respond_to do |format|
        format.js  { render :json => {"aaData"=>@documents}}
    end
  end
  
end
