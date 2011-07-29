class TypeAdressesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_adresses
  # GET /type_adresses.xml
  def index
    if params[:function]!=nil && params[:function]!=''
      if params[:civilite]!=nil && params[:civilite]!=''
        @type_adresses = TypeAdresse.find(:all, :conditions => {:type_intervenant_id => params[:function], :civilite_id => params[:civilite]})
      else
        @type_adresses = TypeAdresse.find(:all, :conditions => {:type_intervenant_id => params[:function]})
      end
    else
      @type_adresses = TypeAdresse.all
    end
    respond_to do |format|
      format.html {render :layout => "light"} # index.html.erb
      format.xml  { render :xml => @type_adresses }
      format.js {render :json => @type_adresses }
    end
  end

  # GET /type_adresses/1
  # GET /type_adresses/1.xml
  def show
    @type_adress = TypeAdresse.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_adress }
    end
  end

  # GET /type_adresses/new
  # GET /type_adresses/new.xml
  def new
    @type_adress = TypeAdresse.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_adress }
    end
  end

  # GET /type_adresses/1/edit
  def edit
    @type_adress = TypeAdresse.find(params[:id])
  end

  # POST /type_adresses
  # POST /type_adresses.xml
  def create
    @type_adress = TypeAdresse.new(params[:type_adresse])

    respond_to do |format|
      if @type_adress.save
        format.html { redirect_to(@type_adress, :notice => 'Type adresse was successfully created.') }
        format.xml  { render :xml => @type_adress, :status => :created, :location => @type_adress }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_adress.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_adresses/1
  # PUT /type_adresses/1.xml
  def update
    @type_adress = TypeAdresse.find(params[:id])

    respond_to do |format|
      if @type_adress.update_attributes(params[:type_adresse])
        format.html { redirect_to(@type_adress, :notice => 'Type adresse was successfully updated.') }
        format.xml  { head :ok }
        format.json { head :ok }
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_adress.errors, :status => :unprocessable_entity }
        format.json { render :json => @type_adress.errors.full_messages, :status => :unprocessable_entity }
        
      end
    end
  end

  # DELETE /type_adresses/1
  # DELETE /type_adresses/1.xml
  def destroy
    @type_adress = TypeAdresse.find(params[:id])
    @type_adress.destroy

    respond_to do |format|
      format.html { redirect_to(type_adresses_url) }
      format.xml  { head :ok }
    end
  end
end
