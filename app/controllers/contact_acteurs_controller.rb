class ContactActeursController < ApplicationController
  # GET /contact_acteurs
  # GET /contact_acteurs.xml
  def index
    @contact_acteurs = ContactActeur.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @contact_acteurs }
    end
  end

  # GET /contact_acteurs/1
  # GET /contact_acteurs/1.xml
  def show
    @contact_acteur = ContactActeur.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @contact_acteur }
    end
  end

  # GET /contact_acteurs/new
  # GET /contact_acteurs/new.xml
  def new
    @contact_acteur = ContactActeur.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @contact_acteur }
    end
  end

  # GET /contact_acteurs/1/edit
  def edit
    @contact_acteur = ContactActeur.find(params[:id])
  end

  # POST /contact_acteurs
  # POST /contact_acteurs.xml
  def create
    @contact_acteur = ContactActeur.new(params[:contact_acteur])

    respond_to do |format|
      if @contact_acteur.save
        format.html { redirect_to(@contact_acteur, :notice => 'Contact acteur was successfully created.') }
        format.xml  { render :xml => @contact_acteur, :status => :created, :location => @contact_acteur }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @contact_acteur.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /contact_acteurs/1
  # PUT /contact_acteurs/1.xml
  def update
    @contact_acteur = ContactActeur.find(params[:id])

    respond_to do |format|
      if @contact_acteur.update_attributes(params[:contact_acteur])
        format.html { redirect_to(@contact_acteur, :notice => 'Contact acteur was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @contact_acteur.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /contact_acteurs/1
  # DELETE /contact_acteurs/1.xml
  def destroy
    @contact_acteur = ContactActeur.find(params[:id])
    @contact_acteur.destroy

    respond_to do |format|
      format.html { redirect_to(contact_acteurs_url) }
      format.xml  { head :ok }
    end
  end
end
