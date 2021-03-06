class TypeExpertisesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_expertises
  # GET /type_expertises.xml
  def index
    if params[:term] != nil
      @type_expertises = current_user.parametres_cabinet.type_expertises.find(:all, :conditions => ["LOWER(description) LIKE LOWER(?)", "%#{params[:term]}%"])
    else
      @type_expertises = current_user.parametres_cabinet.type_expertises.all
    end

    respond_to do |format|
      format.html {render :layout => "light"} # index.html.erb
      format.xml  { render :xml => @type_expertises }
      format.js {render :json => @type_expertises.map {|p| { :value => p.id, :label => p.description }} }
      format.json {render :json => {"success"=>true,"data"=>@type_expertises}}
      
    end
  end

  # GET /type_expertises/1
  # GET /type_expertises/1.xml
  def show
    @type_expertise = TypeExpertise.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_expertise }
    end
  end

  # GET /type_expertises/new
  # GET /type_expertises/new.xml
  def new
    @type_expertise = TypeExpertise.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_expertise }
    end
  end

  # GET /type_expertises/1/edit
  def edit
    @type_expertise = TypeExpertise.find(params[:id])
  end

  # POST /type_expertises
  # POST /type_expertises.xml
  def create
    @type_expertise = TypeExpertise.new(params[:type_expertise])
    @type_expertise.parametres_cabinet_id = current_user.parametres_cabinet_id
    respond_to do |format|
      if @type_expertise.save
        format.html { redirect_to(@type_expertise, :notice => 'Type expertise was successfully created.') }
        format.xml  { render :xml => @type_expertise, :status => :created, :location => @type_expertise }
        format.json {render :json => {"success"=>true,"data"=>@type_expertise}}
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_expertise.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_expertises/1
  # PUT /type_expertises/1.xml
  def update
    @type_expertise = TypeExpertise.find(params[:id])

    respond_to do |format|
      if @type_expertise.update_attributes(params[:type_expertise])
        format.html { redirect_to(@type_expertise, :notice => 'Type expertise was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@type_expertise}}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_expertise.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_expertises/1
  # DELETE /type_expertises/1.xml
  def destroy
    @type_expertise = TypeExpertise.find(params[:id])
    @type_expertise.destroy


    respond_to do |format|
      format.html { redirect_to(type_expertises_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
    end
  end
end
