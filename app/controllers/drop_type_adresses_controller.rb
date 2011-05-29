class DropTypeAdressesController < ApplicationController
  # GET /drop_type_adresses
  # GET /drop_type_adresses.xml
  def index
    @drop_type_adresses = DropTypeAdress.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @drop_type_adresses }
    end
  end

  # GET /drop_type_adresses/1
  # GET /drop_type_adresses/1.xml
  def show
    @drop_type_adress = DropTypeAdress.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @drop_type_adress }
    end
  end

  # GET /drop_type_adresses/new
  # GET /drop_type_adresses/new.xml
  def new
    @drop_type_adress = DropTypeAdress.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @drop_type_adress }
    end
  end

  # GET /drop_type_adresses/1/edit
  def edit
    @drop_type_adress = DropTypeAdress.find(params[:id])
  end

  # POST /drop_type_adresses
  # POST /drop_type_adresses.xml
  def create
    @drop_type_adress = DropTypeAdress.new(params[:drop_type_adress])

    respond_to do |format|
      if @drop_type_adress.save
        format.html { redirect_to(@drop_type_adress, :notice => 'Drop type adress was successfully created.') }
        format.xml  { render :xml => @drop_type_adress, :status => :created, :location => @drop_type_adress }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @drop_type_adress.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /drop_type_adresses/1
  # PUT /drop_type_adresses/1.xml
  def update
    @drop_type_adress = DropTypeAdress.find(params[:id])

    respond_to do |format|
      if @drop_type_adress.update_attributes(params[:drop_type_adress])
        format.html { redirect_to(@drop_type_adress, :notice => 'Drop type adress was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @drop_type_adress.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /drop_type_adresses/1
  # DELETE /drop_type_adresses/1.xml
  def destroy
    @drop_type_adress = DropTypeAdress.find(params[:id])
    @drop_type_adress.destroy

    respond_to do |format|
      format.html { redirect_to(drop_type_adresses_url) }
      format.xml  { head :ok }
    end
  end
end
