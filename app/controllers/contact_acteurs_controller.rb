class ContactActeursController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /contact_acteurs
  # GET /contact_acteurs.xml
  def index
    if (params[:dossier])
      @dossier = Dossier.find(params[:dossier])
      @acteurs = @dossier.acteurs
      @contact_acteurs = []
      @acteurs.each do |acteur|
        acteur.contact_acteurs.each do |conact|
          @contact_acteurs.push(conact)
        end
      end
    else
      @contact_acteurs = []
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @contact_acteurs }
      format.json {render :json => {"success"=>true,"data"=>@contact_acteurs, :totalSize =>@contact_acteurs.count}}
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
    if params[:acteur]
      @contact_acteur.acteur_id=params[:acteur]
    end
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
    if params[:dossier]
      @contact_acteur.dossier_id = params[:dossier]
    end
    
    respond_to do |format|
      if @contact_acteur.save
        format.html { redirect_to(@contact_acteur, :notice => 'Contact acteur was successfully created.') }
        format.xml  { render :xml => @contact_acteur, :status => :created, :location => @contact_acteur }
        format.json  { render :json => { :success => true, :message => "Created Contact Acteur #{@contact_acteur.id}", :data => @contact_acteur}}
        
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
        format.json  { render :json => { :success => true, :message => "Updated Contact Acteur #{@contact_acteur.id}", :data => @contact_acteur}}
        
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
      format.json { render :json => { :success => true, :message => "Destroyed Contact Acteur #{@contact_acteur.id}", :data => []}}
      
    end
  end
end
