class TransmissionMediaController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /transmission_media
  # GET /transmission_media.xml
  def index
    @transmission_medias = TransmissionMedium.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @transmission_medias }
      format.json {render :json => {"success"=>true,"data"=>@transmission_medias}}
      
    end
  end

  # GET /transmission_media/1
  # GET /transmission_media/1.xml
  def show
    @transmission_medium = TransmissionMedium.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @transmission_medium }
    end
  end

  # GET /transmission_media/new
  # GET /transmission_media/new.xml
  def new
    @transmission_medium = TransmissionMedium.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @transmission_medium }
    end
  end

  # GET /transmission_media/1/edit
  def edit
    @transmission_medium = TransmissionMedium.find(params[:id])
  end

  # POST /transmission_media
  # POST /transmission_media.xml
  def create
    @transmission_medium = TransmissionMedium.new(params[:transmission_medium])

    respond_to do |format|
      if @transmission_medium.save
        format.html { redirect_to(@transmission_medium, :notice => 'Transmission medium was successfully created.') }
        format.xml  { render :xml => @transmission_medium, :status => :created, :location => @transmission_medium }
        format.json {render :json => {"success"=>true,"data"=>@transmission_medium}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @transmission_medium.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /transmission_media/1
  # PUT /transmission_media/1.xml
  def update
    @transmission_medium = TransmissionMedium.find(params[:id])

    respond_to do |format|
      if @transmission_medium.update_attributes(params[:transmission_medium])
        format.html { redirect_to(@transmission_medium, :notice => 'Transmission medium was successfully updated.') }
        format.json {render :json => {"success"=>true,"data"=>@transmission_medium}}
        
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @transmission_medium.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /transmission_media/1
  # DELETE /transmission_media/1.xml
  def destroy
    @transmission_medium = TransmissionMedium.find(params[:id])
    @transmission_medium.destroy

    respond_to do |format|
      format.html { redirect_to(transmission_medias_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
end
