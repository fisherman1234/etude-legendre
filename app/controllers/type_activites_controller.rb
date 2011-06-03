class TypeActivitesController < ApplicationController
  # GET /type_activites
  # GET /type_activites.xml
  def index
    @type_activites = TypeActivite.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @type_activites }
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

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_activite }
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

    respond_to do |format|
      if @type_activite.save
        format.html { redirect_to(@type_activite, :notice => 'Type activite was successfully created.') }
        format.xml  { render :xml => @type_activite, :status => :created, :location => @type_activite }
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

    respond_to do |format|
      if @type_activite.update_attributes(params[:type_activite])
        format.html { redirect_to(@type_activite, :notice => 'Type activite was successfully updated.') }
        format.xml  { head :ok }
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
    end
  end
end