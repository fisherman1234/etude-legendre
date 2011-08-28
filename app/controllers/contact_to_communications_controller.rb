class ContactToCommunicationsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /contact_to_communication
  # GET /contact_to_communication.xml
  def index
    @contact_to_communications = ContactToCommunication.all
    if (params[:communication_id])
      if params[:clear].present? && params[:clear] == 'true'
        @contact_to_communications = []
      else
        @contact_to_communications = ContactToCommunication.where(:communication_id => params[:communication_id] )
      end
    else
      @contact_to_communications = []
    end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @contact_to_communications }
      format.json {render :json => {"success"=>true,"data"=>@contact_to_communications}}
      
    end
  end

  # GET /contact_to_communication/1
  # GET /contact_to_communication/1.xml
  def show
    @contact_to_communication = ContactToCommunication.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @contact_to_communication }
    end
  end

  # GET /contact_to_communication/new
  # GET /contact_to_communication/new.xml
  def new
    @contact_to_communication = ContactToCommunication.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @contact_to_communication }
    end
  end

  # GET /contact_to_communication/1/edit
  def edit
    @contact_to_communication = ContactToCommunication.find(params[:id])
  end

  # POST /contact_to_communication
  # POST /contact_to_communication.xml
  def create
    @contact_to_communication = ContactToCommunication.new(params[:contact_to_communication])
    if params[:communication_id].present?
      @contact_to_communication.communication_id = params[:communication_id]
    end
    respond_to do |format|
      if @contact_to_communication.save
        format.html { redirect_to(@contact_to_communication, :notice => 'Transmission medium was successfully created.') }
        format.xml  { render :xml => @contact_to_communication, :status => :created, :location => @contact_to_communication }
        format.json {render :json => {"success"=>true,"data"=>@contact_to_communication}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @contact_to_communication.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /contact_to_communication/1
  # PUT /contact_to_communication/1.xml
  def update
    @contact_to_communication = ContactToCommunication.find(params[:id])
    if params[:communication_id].present?
      @contact_to_communication.communication_id = params[:communication_id]
    end
    respond_to do |format|
      if @contact_to_communication.update_attributes(params[:contact_to_communication])
        format.html { redirect_to(@contact_to_communication, :notice => 'Transmission medium was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@contact_to_communication}}
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @contact_to_communication.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /contact_to_communication/1
  # DELETE /contact_to_communication/1.xml
  def destroy
    @contact_to_communication = ContactToCommunication.find(params[:id])
    @contact_to_communication.destroy

    respond_to do |format|
      format.html { redirect_to(contact_to_communications_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
end
