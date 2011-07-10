class TypeActeursController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_acteurs
  # GET /type_acteurs.xml
  def index
    @type_acteurs = TypeActeur.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @type_acteurs }
    end
  end

  # GET /type_acteurs/1
  # GET /type_acteurs/1.xml
  def show
    @type_acteur = TypeActeur.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_acteur }
    end
  end

  # GET /type_acteurs/new
  # GET /type_acteurs/new.xml
  def new
    @type_acteur = TypeActeur.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_acteur }
    end
  end

  # GET /type_acteurs/1/edit
  def edit
    @type_acteur = TypeActeur.find(params[:id])
  end

  # POST /type_acteurs
  # POST /type_acteurs.xml
  def create
    @type_acteur = TypeActeur.new(params[:type_acteur])

    respond_to do |format|
      if @type_acteur.save
        format.html { redirect_to(@type_acteur, :notice => 'Type acteur was successfully created.') }
        format.xml  { render :xml => @type_acteur, :status => :created, :location => @type_acteur }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_acteur.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_acteurs/1
  # PUT /type_acteurs/1.xml
  def update
    @type_acteur = TypeActeur.find(params[:id])

    respond_to do |format|
      if @type_acteur.update_attributes(params[:type_acteur])
        format.html { redirect_to(@type_acteur, :notice => 'Type acteur was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_acteur.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_acteurs/1
  # DELETE /type_acteurs/1.xml
  def destroy
    @type_acteur = TypeActeur.find(params[:id])
    @type_acteur.destroy

    respond_to do |format|
      format.html { redirect_to(type_acteurs_url) }
      format.xml  { head :ok }
    end
  end
end
