class InstitutionsController < ApplicationController

  before_filter :authenticate_user!
  
  # GET /institutions
  # GET /institutions.xml
  def index
    if params[:term] != nil
      if params[:type] != nil
        @institutions = Institution.find(:all, :conditions => ["LOWER(nom) LIKE LOWER(?) and type_institution_id=?", "%#{params[:term]}%", "#{params[:type]}"])
      else
        @institutions = Institution.find(:all, :conditions => ["LOWER(nom) LIKE LOWER(?)", "%#{params[:term]}%"])
      end
    else
      @institutions = Institution.all
    end
      

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @institutions }
      format.js {render :json => @institutions.map {|p| {  :label => p.nom  , :value => p.id}} }
      format.json {render :json => {"success"=>true,"data"=>@institutions} }
      
    end
  end

  # GET /institutions/1
  # GET /institutions/1.xml
  def show
    @institution = Institution.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @institution }
      format.json {render :json => {"success"=>true,"data"=>@institution} }
      
    end
  end

  # GET /institutions/new
  # GET /institutions/new.xml
  def new
    @institution = Institution.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @institution }
    end
  end

  # GET /institutions/1/edit
  def edit
    @institution = Institution.find(params[:id])
  end

  # POST /institutions
  # POST /institutions.xml
  def create
    @institution = Institution.new(params[:institution])

    respond_to do |format|
      if @institution.save
        format.html { redirect_to(@institution, :notice => 'Institution was successfully created.') }
        format.xml  { render :xml => @institution, :status => :created, :location => @institution }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @institution.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /institutions/1
  # PUT /institutions/1.xml
  def update
    @institution = Institution.find(params[:id])

    respond_to do |format|
      if @institution.update_attributes(params[:institution])
        format.html { redirect_to(@institution, :notice => 'Institution was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @institution.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /institutions/1
  # DELETE /institutions/1.xml
  def destroy
    @institution = Institution.find(params[:id])
    @institution.destroy

    respond_to do |format|
      format.html { redirect_to(institutions_url) }
      format.xml  { head :ok }
    end
  end
end
