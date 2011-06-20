class TypeStatusConsignationsController < ApplicationController
  # GET /type_status_consignations
  # GET /type_status_consignations.xml
  def index
    @type_status_consignations = TypeStatusConsignation.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @type_status_consignations }
    end
  end

  # GET /type_status_consignations/1
  # GET /type_status_consignations/1.xml
  def show
    @type_status_consignation = TypeStatusConsignation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_status_consignation }
    end
  end

  # GET /type_status_consignations/new
  # GET /type_status_consignations/new.xml
  def new
    @type_status_consignation = TypeStatusConsignation.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_status_consignation }
    end
  end

  # GET /type_status_consignations/1/edit
  def edit
    @type_status_consignation = TypeStatusConsignation.find(params[:id])
  end

  # POST /type_status_consignations
  # POST /type_status_consignations.xml
  def create
    @type_status_consignation = TypeStatusConsignation.new(params[:type_status_consignation])

    respond_to do |format|
      if @type_status_consignation.save
        format.html { redirect_to(@type_status_consignation, :notice => 'Type status consignation was successfully created.') }
        format.xml  { render :xml => @type_status_consignation, :status => :created, :location => @type_status_consignation }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_status_consignation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_status_consignations/1
  # PUT /type_status_consignations/1.xml
  def update
    @type_status_consignation = TypeStatusConsignation.find(params[:id])

    respond_to do |format|
      if @type_status_consignation.update_attributes(params[:type_status_consignation])
        format.html { redirect_to(@type_status_consignation, :notice => 'Type status consignation was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_status_consignation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_status_consignations/1
  # DELETE /type_status_consignations/1.xml
  def destroy
    @type_status_consignation = TypeStatusConsignation.find(params[:id])
    @type_status_consignation.destroy

    respond_to do |format|
      format.html { redirect_to(type_status_consignations_url) }
      format.xml  { head :ok }
    end
  end
end
