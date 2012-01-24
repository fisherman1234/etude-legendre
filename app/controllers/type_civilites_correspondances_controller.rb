class TypeCivilitesCorrespondancesController < ApplicationController
  # GET /type_civilites_correspondances
  # GET /type_civilites_correspondances.xml
  def index
    @type_civilites_correspondances =  current_user.parametres_cabinet.type_civilites_correspondances.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @type_civilites_correspondances }
      format.json {render :json => {"success"=>true,"data"=>@type_civilites_correspondances}}
    end
  end

  # GET /type_civilites_correspondances/1
  # GET /type_civilites_correspondances/1.xml
  def show
    @type_civilites_correspondance = TypeCivilitesCorrespondance.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_civilites_correspondance }
    end
  end

  # GET /type_civilites_correspondances/new
  # GET /type_civilites_correspondances/new.xml
  def new
    @type_civilites_correspondance = TypeCivilitesCorrespondance.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_civilites_correspondance }
    end
  end

  # GET /type_civilites_correspondances/1/edit
  def edit
    @type_civilites_correspondance = TypeCivilitesCorrespondance.find(params[:id])
  end

  # POST /type_civilites_correspondances
  # POST /type_civilites_correspondances.xml
  def create
    @type_civilites_correspondance = TypeCivilitesCorrespondance.new(params[:type_civilites_correspondance])
    @type_civilites_correspondance.parametres_cabinet_id = current_user.parametres_cabinet_id

    respond_to do |format|
      if @type_civilites_correspondance.save
        format.html { redirect_to(@type_civilites_correspondance, :notice => 'Type civilites correspondance was successfully created.') }
        format.xml  { render :xml => @type_civilites_correspondance, :status => :created, :location => @type_civilites_correspondance }
        format.json {render :json => {"success"=>true,"data"=>@type_civilites_correspondance}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_civilites_correspondance.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_civilites_correspondances/1
  # PUT /type_civilites_correspondances/1.xml
  def update
    @type_civilites_correspondance = TypeCivilitesCorrespondance.find(params[:id])

    respond_to do |format|
      if @type_civilites_correspondance.update_attributes(params[:type_civilites_correspondance])
        format.html { redirect_to(@type_civilites_correspondance, :notice => 'Type civilites correspondance was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@type_civilites_correspondance}}
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_civilites_correspondance.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_civilites_correspondances/1
  # DELETE /type_civilites_correspondances/1.xml
  def destroy
    @type_civilites_correspondance = TypeCivilitesCorrespondance.find(params[:id])
    @type_civilites_correspondance.destroy

    respond_to do |format|
      format.html { redirect_to(type_civilites_correspondances_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
end
