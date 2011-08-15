class ActeursController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /acteurs
  # GET /acteurs.xml
  def index
    if (params[:dossier])
      @dossier = Dossier.find(params[:dossier])
      @acteurs = @dossier.acteurs
    else
      @acteurs = []
    end
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @acteurs }
      format.json {render :json => {"success"=>true,"data"=>@acteurs, :totalSize =>@acteurs.count}}
      
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
  
  def getActorTree
    tree = []
    
    if params[:dossier]
       @dossier = Dossier.find(params[:dossier])
       @dossier.acteurs.each do |acteur|
         content = {:expanded => true, :cls => "folder", :id => acteur.id, :text => acteur.description, :qualite_procedurale => '', :institution=>'', :email => '', :telephone => ''}
         contact_acteurs = []
         acteur.contact_acteurs.each do |con_act|
           contact_content = {:id => con_act.id, :text => con_act.contact.full_name, :qualite_procedurale => con_act.qualite_procedurale.try(:description), :institution=>con_act.contact.institution.try(:nom), :email => con_act.contact.try(:email), :telephone => con_act.contact.try(:telephone), :leaf => true}
           contact_acteurs.push(contact_content)
         end
        content[:children] = contact_acteurs
        tree.push(content)
       end
    end
    
    respond_to do |format|
      format.json  { render :json => tree }
    end
  end
  
end
