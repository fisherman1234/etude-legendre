class ActivitesController < ApplicationController
  # GET /activites
  # GET /activites.xml
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

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @activite }
    end
  end

  # GET /activites/1/edit
  def edit
    @activite = Activite.find(params[:id])
  end

  # POST /activites
  # POST /activites.xml
  def create
    @activite = Activite.new(params[:activite])

    respond_to do |format|
      if @activite.save
        format.html { redirect_to(@activite, :notice => 'Activite was successfully created.') }
        format.xml  { render :xml => @activite, :status => :created, :location => @activite }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @activite.errors, :status => :unprocessable_entity }
      end
    end
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
end
