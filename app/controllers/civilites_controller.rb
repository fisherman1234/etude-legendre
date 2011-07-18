class CivilitesController < ApplicationController
  # GET /civilites
  # GET /civilites.xml
  def index
    @civilites = Civilite.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @civilites }
    end
  end

  # GET /civilites/1
  # GET /civilites/1.xml
  def show
    @civilite = Civilite.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @civilite }
    end
  end

  # GET /civilites/new
  # GET /civilites/new.xml
  def new
    @civilite = Civilite.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @civilite }
    end
  end

  # GET /civilites/1/edit
  def edit
    @civilite = Civilite.find(params[:id])
  end

  # POST /civilites
  # POST /civilites.xml
  def create
    @civilite = Civilite.new(params[:civilite])

    respond_to do |format|
      if @civilite.save
        format.html { redirect_to(@civilite, :notice => 'Civilite was successfully created.') }
        format.xml  { render :xml => @civilite, :status => :created, :location => @civilite }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @civilite.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /civilites/1
  # PUT /civilites/1.xml
  def update
    @civilite = Civilite.find(params[:id])

    respond_to do |format|
      if @civilite.update_attributes(params[:civilite])
        format.html { redirect_to(@civilite, :notice => 'Civilite was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @civilite.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /civilites/1
  # DELETE /civilites/1.xml
  def destroy
    @civilite = Civilite.find(params[:id])
    @civilite.destroy

    respond_to do |format|
      format.html { redirect_to(civilites_url) }
      format.xml  { head :ok }
    end
  end
end
