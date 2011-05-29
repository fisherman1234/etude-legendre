class ActeursController < ApplicationController
  # GET /acteurs
  # GET /acteurs.xml
  def index
    @acteurs = Acteur.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @acteurs }
    end
  end

  # GET /acteurs/1
  # GET /acteurs/1.xml
  def show
    @acteur = Acteur.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @acteur }
    end
  end

  # GET /acteurs/new
  # GET /acteurs/new.xml
  def new
    @acteur = Acteur.new
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @acteur }
    end
  end

  # GET /acteurs/1/edit
  def edit
    @acteur = Acteur.find(params[:id])
  end

  # POST /acteurs
  # POST /acteurs.xml
  def create
    @acteur = Acteur.new(params[:acteur])

    respond_to do |format|
      if @acteur.save
        format.html { redirect_to(@acteur, :notice => 'Acteur was successfully created.') }
        format.xml  { render :xml => @acteur, :status => :created, :location => @acteur }
        format.js { render :json => @acteur, :status => :created, :location => @acteur }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @acteur.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /acteurs/1
  # PUT /acteurs/1.xml
  def update
    @acteur = Acteur.find(params[:id])

    respond_to do |format|
      if @acteur.update_attributes(params[:acteur])
        format.html { redirect_to(@acteur, :notice => 'Acteur was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @acteur.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /acteurs/1
  # DELETE /acteurs/1.xml
  def destroy
    @acteur = Acteur.find(params[:id])
    @acteur.destroy

    respond_to do |format|
      format.html { redirect_to(acteurs_url) }
      format.xml  { head :ok }
    end
  end
end
