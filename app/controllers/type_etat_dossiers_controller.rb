class TypeEtatDossiersController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_etat_dossiers
  # GET /type_etat_dossiers.xml
  def index
    @type_etat_dossiers = current_user.parametres_cabinet.type_etat_dossiers.all

    respond_to do |format|
      format.html {render :layout => "light"} # index.html.erb
      format.xml  { render :xml => @type_etat_dossiers }
      format.json {render :json => {"success"=>true,"data"=>@type_etat_dossiers}}
      
    end
  end

  # GET /type_etat_dossiers/1
  # GET /type_etat_dossiers/1.xml
  def show
    @type_etat_dossier = TypeEtatDossier.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_etat_dossier }
    end
  end

  # GET /type_etat_dossiers/new
  # GET /type_etat_dossiers/new.xml
  def new
    @type_etat_dossier = TypeEtatDossier.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_etat_dossier }
    end
  end

  # GET /type_etat_dossiers/1/edit
  def edit
    @type_etat_dossier = TypeEtatDossier.find(params[:id])
  end

  # POST /type_etat_dossiers
  # POST /type_etat_dossiers.xml
  def create
    @type_etat_dossier = TypeEtatDossier.new(params[:type_etat_dossier])
@type_etat_dossier.parametres_cabinet_id = current_user.parametres_cabinet_id
    respond_to do |format|
      if @type_etat_dossier.save
        format.html { redirect_to(@type_etat_dossier, :notice => 'Type etat dossier was successfully created.') }
        format.xml  { render :xml => @type_etat_dossier, :status => :created, :location => @type_etat_dossier }
        format.json {render :json => {"success"=>true,"data"=>@type_etat_dossier}}
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_etat_dossier.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_etat_dossiers/1
  # PUT /type_etat_dossiers/1.xml
  def update
    @type_etat_dossier = TypeEtatDossier.find(params[:id])

    respond_to do |format|
      if @type_etat_dossier.update_attributes(params[:type_etat_dossier])
        format.html { redirect_to(@type_etat_dossier, :notice => 'Type etat dossier was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@type_etat_dossier}}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_etat_dossier.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_etat_dossiers/1
  # DELETE /type_etat_dossiers/1.xml
  def destroy
    @type_etat_dossier = TypeEtatDossier.find(params[:id])
    @type_etat_dossier.destroy

    respond_to do |format|
      format.html { redirect_to(type_etat_dossiers_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
    end
  end
end
