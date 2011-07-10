class TypeInstitutionsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_institutions
  # GET /type_institutions.xml
  def index
    @type_institutions = TypeInstitution.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @type_institutions }
    end
  end

  # GET /type_institutions/1
  # GET /type_institutions/1.xml
  def show
    @type_institution = TypeInstitution.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_institution }
    end
  end

  # GET /type_institutions/new
  # GET /type_institutions/new.xml
  def new
    @type_institution = TypeInstitution.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_institution }
    end
  end

  # GET /type_institutions/1/edit
  def edit
    @type_institution = TypeInstitution.find(params[:id])
  end

  # POST /type_institutions
  # POST /type_institutions.xml
  def create
    @type_institution = TypeInstitution.new(params[:type_institution])

    respond_to do |format|
      if @type_institution.save
        format.html { redirect_to(@type_institution, :notice => 'Type institution was successfully created.') }
        format.xml  { render :xml => @type_institution, :status => :created, :location => @type_institution }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_institution.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_institutions/1
  # PUT /type_institutions/1.xml
  def update
    @type_institution = TypeInstitution.find(params[:id])

    respond_to do |format|
      if @type_institution.update_attributes(params[:type_institution])
        format.html { redirect_to(@type_institution, :notice => 'Type institution was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_institution.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_institutions/1
  # DELETE /type_institutions/1.xml
  def destroy
    @type_institution = TypeInstitution.find(params[:id])
    @type_institution.destroy

    respond_to do |format|
      format.html { redirect_to(type_institutions_url) }
      format.xml  { head :ok }
    end
  end
end
