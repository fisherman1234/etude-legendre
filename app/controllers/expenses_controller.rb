class ExpensesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /expenses
  # GET /expenses.xml
  def index
    @expenses = Expense.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @expenses }
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
    @expense.categorie_id = Item.find(params[:expense][:item_id]).categorie_id
    @expense.save
    render :json => {'activite'=>@expense.activite.try(:description).to_s, 'type_depense' => @expense.item.try(:description).to_s, 'date_item' => @expense.date_item.to_s, 'description_item'=> @expense.description.to_s, 'prix_unitaire'=> @expense.prix_unitaire.to_s, 'quantite'=> @expense.quantite.to_s,'unite'=>@expense.unite.description.to_s, 'tva'=> @expense.taux_tva.description.to_s, 'total'=>@expense.total.to_s}
    
  end

  # PUT /expenses/1
  # PUT /expenses/1.xml
  def update
    @expense = Expense.find(params[:id])
    @expense.categorie_id = Item.find(params[:expense][:item_id]).categorie_id
    respond_to do |format|
      if @expense.update_attributes(params[:expense])
        format.html { redirect_to(@expense, :notice => 'Expense was successfully updated.') }
        format.xml  { head :ok }
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
    @expense.destroy

    respond_to do |format|
      format.html { redirect_to(expenses_url) }
      format.xml  { head :ok }
    end
  end
end
