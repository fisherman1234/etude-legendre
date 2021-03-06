class CategoriesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /categories
  # GET /categories.xml
  def index
    @categories = Categorie.find(:all, :conditions => {:parametres_cabinet_id => current_user.parametres_cabinet_id})

    respond_to do |format|
      format.html  {render :layout => "light"} # index.html.erb
      format.xml  { render :xml => @categories }
      format.json {render :json => {"success"=>true,"data"=>@categories}}
      
    end
  end

  # GET /categories/1
  # GET /categories/1.xml
  def show
    @categorie = Categorie.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @categorie }
    end
  end

  # GET /categories/new
  # GET /categories/new.xml
  def new
    @categorie = Categorie.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @categorie }
    end
  end

  # GET /categories/1/edit
  def edit
    @categorie = Categorie.find(params[:id])
  end

  # POST /categories
  # POST /categories.xml
  def create
    @categorie = Categorie.new(params[:categorie])
    @categorie.parametres_cabinet_id = current_user.parametres_cabinet_id
    respond_to do |format|
      if @categorie.save
        format.html { redirect_to(@categorie, :notice => 'Categorie was successfully created.') }
        format.xml  { render :xml => @categorie, :status => :created, :location => @categorie }
        format.json {render :json => {"success"=>true,"data"=>@categorie}}
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @categorie.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /categories/1
  # PUT /categories/1.xml
  def update
    @categorie = Categorie.find(params[:id])

    respond_to do |format|
      if @categorie.update_attributes(params[:categorie])
        format.html { redirect_to(@categorie, :notice => 'Categorie was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@categorie}}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @categorie.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.xml
  def destroy
    @categorie = Categorie.find(params[:id])
    @categorie.destroy

    respond_to do |format|
      format.html { redirect_to(categories_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
    end
  end
end
