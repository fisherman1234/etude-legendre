class TauxTvasController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /taux_tvas
  # GET /taux_tvas.xml
  def index
    @taux_tvas = current_user.parametres_cabinet.taux_tvas.all

    respond_to do |format|
      format.html {render :layout => "light"} # index.html.erb
      format.xml  { render :xml => @taux_tvas }
      format.json {render :json => {"success"=>true,"data"=>@taux_tvas}}
      
    end
  end

  # GET /taux_tvas/1
  # GET /taux_tvas/1.xml
  def show
    @taux_tva = TauxTva.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @taux_tva }
    end
  end

  # GET /taux_tvas/new
  # GET /taux_tvas/new.xml
  def new
    @taux_tva = TauxTva.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @taux_tva }
    end
  end

  # GET /taux_tvas/1/edit
  def edit
    @taux_tva = TauxTva.find(params[:id])
  end

  # POST /taux_tvas
  # POST /taux_tvas.xml
  def create
    @taux_tva = TauxTva.new(params[:taux_tva])

    respond_to do |format|
      if @taux_tva.save
        format.html { redirect_to(@taux_tva, :notice => 'Taux tva was successfully created.') }
        format.xml  { render :xml => @taux_tva, :status => :created, :location => @taux_tva }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @taux_tva.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /taux_tvas/1
  # PUT /taux_tvas/1.xml
  def update
    @taux_tva = TauxTva.find(params[:id])

    respond_to do |format|
      if @taux_tva.update_attributes(params[:taux_tva])
        format.html { redirect_to(@taux_tva, :notice => 'Taux tva was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @taux_tva.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /taux_tvas/1
  # DELETE /taux_tvas/1.xml
  def destroy
    @taux_tva = TauxTva.find(params[:id])
    @taux_tva.destroy

    respond_to do |format|
      format.html { redirect_to(taux_tvas_url) }
      format.xml  { head :ok }
    end
  end
end
