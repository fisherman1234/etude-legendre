class ExpensesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /expenses
  # GET /expenses.xml
  def index

        if (params[:dossier])
          if params[:dossier] && params[:clear].present? && params[:clear] == 'true'
            @expenses = []
          elsif params[:dossier] && params[:activite_id].present? && params[:activite_id]!='undefined' 
            @expenses = Expense.where(:dossier_id => params[:dossier], :activite_id => params[:activite_id])
          else
            @expenses = Expense.where(:dossier_id => params[:dossier])
          end
        else
          @expenses = []
        end
    

    respond_to do |format|
      format.html  # index.html.erb
      format.xml  { render :xml => @expenses }
      format.json {render :json => {"success"=>true,"data"=>@expenses.map {|p| p.attributes.merge(:total_ht => p.total, :total_ttc => p.total_ttc, :activite_name => p.activite.try(:description))}, :totalSize =>@expenses.count}}
      
    end
  end

  # GET /expenses/1
  # GET /expenses/1.xml
  def show
    @expense = Expense.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @expense }
    end
  end

  # GET /expenses/new
  # GET /expenses/new.xml
  def new
    @expense = Expense.new
    if params[:dossier]
      @expense.dossier_id = params[:dossier]
    end
    if params[:activite]
      @expense.activite_id = params[:activite]
    end


    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @expense }
    end
  end

  # GET /expenses/1/edit
  def edit
    @expense = Expense.find(params[:id])
  end

  # POST /expenses
  # POST /expenses.xml
  def create
    @expense = Expense.new(params[:expense])
    if params[:expense][:item_id].present?
      @expense.categorie_id = Item.find(params[:expense][:item_id]).categorie_id
    end
    @expense.dossier_id = params[:dossier]
    
    if params[:activite_id].present?
      @expense.activite_id = params[:activite_id]
    end
    
    @expense.save
    respond_to do |format|
      format.json  { render :json => { :success => true, :message => "Created Expense #{@expense.id}", :data => @expense.attributes.merge(:total_ht => @expense.total, :total_ttc => @expense.total_ttc, :activite_name => @expense.activite.try(:description))}}
    end
    
  end

  # PUT /expenses/1
  # PUT /expenses/1.xml
  def update
    
    @expense = Expense.find(params[:id])
    
    if params[:expense][:item_id].present?
      @expense.categorie_id = Item.find(params[:expense][:item_id]).categorie_id
    end
    if params[:activite_id].present?
      @expense.activite_id = params[:activite_id]
    end
    
    respond_to do |format|
      if @expense.update_attributes(params[:expense])
        format.html { redirect_to(@expense, :notice => 'Expense was successfully updated.') }
        format.xml  { head :ok }
        format.json  { render :json => { :success => true, :message => "Updated Expense #{@expense.id}", :data => @expense.attributes.merge(:total_ht => @expense.total, :total_ttc => @expense.total_ttc, :activite_name => @expense.activite.try(:description))}}        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @expense.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /expenses/1
  # DELETE /expenses/1.xml
  def destroy
    @expense = Expense.find(params[:id])
    if @expense.dossier.parametres_cabinet.id = current_user.parametres_cabinet.id
      @expense.destroy
    end

    respond_to do |format|
      format.html { redirect_to(expenses_url) }
      format.xml  { head :ok }
      format.json { render :json => { :success => true, :message => "Destroyed Expense #{@expense.id}", :data => []}}
    end
  end
end
