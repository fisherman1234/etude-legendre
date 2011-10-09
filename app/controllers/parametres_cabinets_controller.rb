class ParametresCabinetsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /parametres_cabinets
  # GET /parametres_cabinets.xml
  def index
    @parametres_cabinet = current_user.parametres_cabinet

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @parametres_cabinets }
    end
  end

  # GET /parametres_cabinets/1
  # GET /parametres_cabinets/1.xml
  def show
    @parametres_cabinet = current_user.parametres_cabinet
    @categories = Categorie.find(:all, :conditions => {:parametres_cabinet_id => current_user.parametres_cabinet_id})

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @parametres_cabinet }
      format.json {render :json => {:parametres_cabinet => @parametres_cabinet, :taux_tvas => @parametres_cabinet.taux_tvas, :type_activites => TypeActivite.all, :institutions => @parametres_cabinet.institutions, :unites => @parametres_cabinet.unites, :contacts => @parametres_cabinet.contacts, :transmission_media => TransmissionMedium.all, :qualite_procedurales => @parametres_cabinet.qualite_procedurales, :reminders => current_user.reminders, :categories => @categories, :type_decisions => @parametres_cabinet.type_decisions, :type_etat_dossiers => @parametres_cabinet.type_etat_dossiers, :type_expertises => @parametres_cabinet.type_expertises, :type_institutions => @parametres_cabinet.type_institutions, :type_intervenants => @parametres_cabinet.type_intervenants, :contacts => @parametres_cabinet.contacts.map {|p| p.attributes.merge(:nom_complet => p.full_name)}, :items => @parametres_cabinet.items, :dossiers => @parametres_cabinet.dossiers {|p| p.attributes.merge(:institution_nom => p.institution.nom, :type_etat_dossier_description => p.type_etat_dossier.try(:description), :juge_mission_id => p.juge_mission.try(:contact_id), :juge_controlleur_id => p.juge_controlleur.try(:contact_id))}}}
    end
  end

  # GET /parametres_cabinets/new
  # GET /parametres_cabinets/new.xml
  def new
    @parametres_cabinet = ParametresCabinet.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @parametres_cabinet }
    end
  end

  # GET /parametres_cabinets/1/edit
  def edit
    @parametres_cabinet = ParametresCabinet.find(params[:id])
    render :layout => "light"
  end

  # POST /parametres_cabinets
  # POST /parametres_cabinets.xml
  def create
    @parametres_cabinet = ParametresCabinet.new(params[:parametres_cabinet])

    respond_to do |format|
      if @parametres_cabinet.save
        format.html { redirect_to(@parametres_cabinet, :notice => 'Parametres cabinet was successfully created.') }
        format.xml  { render :xml => @parametres_cabinet, :status => :created, :location => @parametres_cabinet }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @parametres_cabinet.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /parametres_cabinets/1
  # PUT /parametres_cabinets/1.xml
  def update
    @parametres_cabinet = ParametresCabinet.find(params[:id])

    respond_to do |format|
      if @parametres_cabinet.update_attributes(params[:parametres_cabinet])
        format.html { redirect_to(@parametres_cabinet, :notice => 'Parametres cabinet was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @parametres_cabinet.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /parametres_cabinets/1
  # DELETE /parametres_cabinets/1.xml
  def destroy
    @parametres_cabinet = ParametresCabinet.find(params[:id])
    @parametres_cabinet.destroy

    respond_to do |format|
      format.html { redirect_to(parametres_cabinets_url) }
      format.xml  { head :ok }
    end
  end
end
