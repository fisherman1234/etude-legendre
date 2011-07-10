class StatusConsignationsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /status_consignations
  # GET /status_consignations.xml
  def index
    @status_consignations = StatusConsignation.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @status_consignations }
    end
  end

  # GET /status_consignations/1
  # GET /status_consignations/1.xml
  def show
    @status_consignation = StatusConsignation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @status_consignation }
    end
  end

  # GET /status_consignations/new
  # GET /status_consignations/new.xml
  def new
    @status_consignation = StatusConsignation.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @status_consignation }
    end
  end

  # GET /status_consignations/1/edit
  def edit
    @status_consignation = StatusConsignation.find(params[:id])
  end

  # POST /status_consignations
  # POST /status_consignations.xml
  def create
    @status_consignation = StatusConsignation.new(params[:status_consignation])

    respond_to do |format|
      if @status_consignation.save
        format.html { redirect_to(@status_consignation, :notice => 'Status consignation was successfully created.') }
        format.xml  { render :xml => @status_consignation, :status => :created, :location => @status_consignation }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @status_consignation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /status_consignations/1
  # PUT /status_consignations/1.xml
  def update
    @status_consignation = StatusConsignation.find(params[:id])

    respond_to do |format|
      if @status_consignation.update_attributes(params[:status_consignation])
        format.html { redirect_to(@status_consignation, :notice => 'Status consignation was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @status_consignation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /status_consignations/1
  # DELETE /status_consignations/1.xml
  def destroy
    @status_consignation = StatusConsignation.find(params[:id])
    @status_consignation.destroy

    respond_to do |format|
      format.html { redirect_to(status_consignations_url) }
      format.xml  { head :ok }
    end
  end
end
