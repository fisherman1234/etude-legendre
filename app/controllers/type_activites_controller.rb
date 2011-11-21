class TypeActivitesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_activites
  # GET /type_activites.xml
  def index
    @type_activites = current_user.parametres_cabinet.type_activites.all

    respond_to do |format|
      format.html {render :layout => "light"}  # index.html.erb
      format.xml  { render :xml => @type_activites }
      format.json {render :json => {"success"=>true,"data"=>@type_activites}}
      
    end
  end

  # GET /type_activites/1
  # GET /type_activites/1.xml
  def show
    @type_activite = TypeActivite.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_activite }
    end
  end

  # GET /type_activites/new
  # GET /type_activites/new.xml
  def new
    @type_activite = TypeActivite.new
    @type_activite.parametres_cabinet_id = current_user.parametres_cabinet_id
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_activite }
      format.json {render :json => {"success"=>true,"data"=>@type_activite}}
      
    end
  end

  # GET /type_activites/1/edit
  def edit
    @type_activite = TypeActivite.find(params[:id])
  end

  # POST /type_activites
  # POST /type_activites.xml
  def create
    @type_activite = TypeActivite.new(params[:type_activite])
    @type_activite.parametres_cabinet_id = current_user.parametres_cabinet_id

    respond_to do |format|
      if @type_activite.save
        format.html { redirect_to(@type_activite, :notice => 'Type activite was successfully created.') }
        format.xml  { render :xml => @type_activite, :status => :created, :location => @type_activite }
        format.json {render :json => {"success"=>true,"data"=>@type_activite}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_activite.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_activites/1
  # PUT /type_activites/1.xml
  def update
    @type_activite = TypeActivite.find(params[:id])
    @type_activite.parametres_cabinet_id = current_user.parametres_cabinet_id

    respond_to do |format|
      if @type_activite.update_attributes(params[:type_activite])
        format.html { redirect_to(@type_activite, :notice => 'Type activite was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@type_activite}}
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_activite.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_activites/1
  # DELETE /type_activites/1.xml
  def destroy
    @type_activite = TypeActivite.find(params[:id])
    @type_activite.destroy
    

    respond_to do |format|
      format.html { redirect_to(type_activites_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
end
