class ActivitesController < ApplicationController
  #before_filter :authenticate_user!
  
  # GET /activites
  # GET /activites.xml
  
  def index
    if (params[:dossier])
      @dossier = Dossier.find(params[:dossier])
      @activites = @dossier.activites
    else
      @activites = []
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @activites }
      format.json {render :json => {"success"=>true,"data"=>@activites}}
      
    end
  end

  # GET /activites/1
  # GET /activites/1.xml
  def show
    @activite = Activite.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @activite }
    end
  end

  # GET /activites/new
  # GET /activites/new.xml
  def new
    @activite = Activite.new
    @documents=[]
    if params[:dossier]
      @activite.dossier_id = params[:dossier]
      @dossier = Dossier.find(params[:dossier])
        @dossier.documents.each do |document_item|
          @documents.push(document_item)
          activite_to_document = @activite.activite_to_documents.build(:document_id=>document_item.id)
        end
    end
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @activite }
    end
  end

  # GET /activites/1/edit
  def edit
    @activite = Activite.find(params[:id])
    @communication = @activite.communications.first
    @contacts = []
    @documents = []
    @activite.dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteurs|
        @contacts.push(contact_acteurs.contact)
      end
    end
  end

  # POST /activites
  # POST /activites.xml
  def create
    @activite = Activite.new(params[:activite])
    @activite.dossier_id = params[:dossier]
    @activite.save
    render :json => {"success"=>true,"data"=>@activite}
  
  end

  # PUT /activites/1
  # PUT /activites/1.xml
  def update
    @activite = Activite.find(params[:id])

    
    respond_to do |format|
      if @activite.update_attributes(params[:activite])
        format.html { redirect_to(@activite, :notice => 'Activite was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@activite}}
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @activite.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /activites/1
  # DELETE /activites/1.xml
  def destroy
    @activite = Activite.find(params[:id])
    @activite.destroy

    respond_to do |format|
      format.html { redirect_to(activites_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
  
  def expenses
    @activite = Activite.find(params[:id])
    render :partial => 'expenses'
  end
end
