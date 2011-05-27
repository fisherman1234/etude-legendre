class QualiteProceduralesController < ApplicationController
  # GET /qualite_procedurales
  # GET /qualite_procedurales.xml
  def index
    @qualite_procedurales = QualiteProcedurale.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @qualite_procedurales }
    end
  end

  # GET /qualite_procedurales/1
  # GET /qualite_procedurales/1.xml
  def show
    @qualite_procedurale = QualiteProcedurale.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @qualite_procedurale }
    end
  end

  # GET /qualite_procedurales/new
  # GET /qualite_procedurales/new.xml
  def new
    @qualite_procedurale = QualiteProcedurale.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @qualite_procedurale }
    end
  end

  # GET /qualite_procedurales/1/edit
  def edit
    @qualite_procedurale = QualiteProcedurale.find(params[:id])
  end

  # POST /qualite_procedurales
  # POST /qualite_procedurales.xml
  def create
    @qualite_procedurale = QualiteProcedurale.new(params[:qualite_procedurale])

    respond_to do |format|
      if @qualite_procedurale.save
        format.html { redirect_to(@qualite_procedurale, :notice => 'Qualite procedurale was successfully created.') }
        format.xml  { render :xml => @qualite_procedurale, :status => :created, :location => @qualite_procedurale }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @qualite_procedurale.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /qualite_procedurales/1
  # PUT /qualite_procedurales/1.xml
  def update
    @qualite_procedurale = QualiteProcedurale.find(params[:id])

    respond_to do |format|
      if @qualite_procedurale.update_attributes(params[:qualite_procedurale])
        format.html { redirect_to(@qualite_procedurale, :notice => 'Qualite procedurale was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @qualite_procedurale.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /qualite_procedurales/1
  # DELETE /qualite_procedurales/1.xml
  def destroy
    @qualite_procedurale = QualiteProcedurale.find(params[:id])
    @qualite_procedurale.destroy

    respond_to do |format|
      format.html { redirect_to(qualite_procedurales_url) }
      format.xml  { head :ok }
    end
  end
end
