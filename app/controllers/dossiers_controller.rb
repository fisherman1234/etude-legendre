# coding: utf-8

class DossiersController < ApplicationController
  # GET /dossiers
  # GET /dossiers.xml
  def index
    if params[:term] != nil
      @dossiers = Dossier.find(:all, :conditions => ['id LIKE :search OR ref_cabinet LIKE :search OR nom_dossier LIKE :search', {:search => "%#{params[:term]}%"}])
    else
      @dossiers = Dossier.all
    end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @dossiers }
      format.js {render :json => @dossiers.map {|p| {  :label => p.ref_cabinet+' '+p.nom_dossier  , :value => p.id}} }
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
