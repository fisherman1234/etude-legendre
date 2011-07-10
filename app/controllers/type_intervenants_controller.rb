class TypeIntervenantsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_intervenants
  # GET /type_intervenants.xml
  def index
    @type_intervenants = TypeIntervenant.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @type_intervenants }
    end
  end

  # GET /type_intervenants/1
  # GET /type_intervenants/1.xml
  def show
    @type_intervenant = TypeIntervenant.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_intervenant }
    end
  end

  # GET /type_intervenants/new
  # GET /type_intervenants/new.xml
  def new
    @type_intervenant = TypeIntervenant.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_intervenant }
    end
  end

  # GET /type_intervenants/1/edit
  def edit
    @type_intervenant = TypeIntervenant.find(params[:id])
  end

  # POST /type_intervenants
  # POST /type_intervenants.xml
  def create
    @type_intervenant = TypeIntervenant.new(params[:type_intervenant])

    respond_to do |format|
      if @type_intervenant.save
        format.html { redirect_to(@type_intervenant, :notice => 'Type intervenant was successfully created.') }
        format.xml  { render :xml => @type_intervenant, :status => :created, :location => @type_intervenant }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_intervenant.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_intervenants/1
  # PUT /type_intervenants/1.xml
  def update
    @type_intervenant = TypeIntervenant.find(params[:id])

    respond_to do |format|
      if @type_intervenant.update_attributes(params[:type_intervenant])
        format.html { redirect_to(@type_intervenant, :notice => 'Type intervenant was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_intervenant.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_intervenants/1
  # DELETE /type_intervenants/1.xml
  def destroy
    @type_intervenant = TypeIntervenant.find(params[:id])
    @type_intervenant.destroy

    respond_to do |format|
      format.html { redirect_to(type_intervenants_url) }
      format.xml  { head :ok }
    end
  end
end
