class TypeDecisionsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /type_decisions
  # GET /type_decisions.xml
  def index
    @type_decisions = current_user.parametres_cabinet.type_decisions.all

    respond_to do |format|
      format.html {render :layout => "light"} # index.html.erb
      format.xml  { render :xml => @type_decisions }
      format.json {render :json => {"success"=>true,"data"=>@type_decisions}}
      
    end
  end

  # GET /type_decisions/1
  # GET /type_decisions/1.xml
  def show
    @type_decision = TypeDecision.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_decision }
    end
  end

  # GET /type_decisions/new
  # GET /type_decisions/new.xml
  def new
    @type_decision = TypeDecision.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_decision }
    end
  end

  # GET /type_decisions/1/edit
  def edit
    @type_decision = TypeDecision.find(params[:id])
  end

  # POST /type_decisions
  # POST /type_decisions.xml
  def create
    @type_decision = TypeDecision.new(params[:type_decision])
    @type_decision.parametres_cabinet_id = current_user.parametres_cabinet_id
    respond_to do |format|
      if @type_decision.save
        format.html { redirect_to(@type_decision, :notice => 'Type decision was successfully created.') }
        format.xml  { render :xml => @type_decision, :status => :created, :location => @type_decision }
        format.json {render :json => {"success"=>true,"data"=>@type_decision}}
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_decision.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_decisions/1
  # PUT /type_decisions/1.xml
  def update
    @type_decision = TypeDecision.find(params[:id])

    respond_to do |format|
      if @type_decision.update_attributes(params[:type_decision])
        format.html { redirect_to(@type_decision, :notice => 'Type decision was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@type_decision}}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_decision.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_decisions/1
  # DELETE /type_decisions/1.xml
  def destroy
    @type_decision = TypeDecision.find(params[:id])
    @type_decision.destroy

    respond_to do |format|
      format.html { redirect_to(type_decisions_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
    end
  end
end
