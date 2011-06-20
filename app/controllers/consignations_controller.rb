class ConsignationsController < ApplicationController
  # GET /consignations
  # GET /consignations.xml
  def index
    @consignations = Consignation.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @consignations }
    end
  end

  # GET /consignations/1
  # GET /consignations/1.xml
  def show
    @consignation = Consignation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @consignation }
    end
  end

  # GET /consignations/new
  # GET /consignations/new.xml
  def new
    @consignation = Consignation.new
    if params[:dossier]
      @consignation.dossier_id = params[:dossier]
    end

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @consignation }
    end
  end

  # GET /consignations/1/edit
  def edit
    @consignation = Consignation.find(params[:id])
  end

  # POST /consignations
  # POST /consignations.xml
  def create
    @consignation = Consignation.new(params[:consignation])

    respond_to do |format|
      if @consignation.save
        format.html { redirect_to(@consignation, :notice => 'Consignation was successfully created.') }
        format.xml  { render :xml => @consignation, :status => :created, :location => @consignation }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @consignation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /consignations/1
  # PUT /consignations/1.xml
  def update
    @consignation = Consignation.find(params[:id])

    respond_to do |format|
      if @consignation.update_attributes(params[:consignation])
        format.html { redirect_to(@consignation, :notice => 'Consignation was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @consignation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /consignations/1
  # DELETE /consignations/1.xml
  def destroy
    @consignation = Consignation.find(params[:id])
    @consignation.destroy

    respond_to do |format|
      format.html { redirect_to(consignations_url) }
      format.xml  { head :ok }
    end
  end
  
  def consignation_list
    @consignation = Consignation.find(params[:id])
    respond_to do |format|
      format.html { redirect_to(consignations_url) }
      format.xml  { head :ok }
    end
  end
end
