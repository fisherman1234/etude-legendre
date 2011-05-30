class CodePostalVillesController < ApplicationController
  # GET /code_postal_villes
  # GET /code_postal_villes.xml
  def index
    if params[:code_postal]
      @code_postal_villes= CodePostalVille.find(:all, :conditions => {:code_postal => params[:code_postal]})
    else
      @code_postal_villes = CodePostalVille.all
    end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @code_postal_villes }
      format.js  { render :json => @code_postal_villes.each.map {|p| {  :label => p.ville  , :value => p.ville}} }
    end
  end

  # GET /code_postal_villes/1
  # GET /code_postal_villes/1.xml
  def show
    @code_postal_ville = CodePostalVille.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @code_postal_ville }
    end
  end

  # GET /code_postal_villes/new
  # GET /code_postal_villes/new.xml
  def new
    @code_postal_ville = CodePostalVille.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @code_postal_ville }
    end
  end

  # GET /code_postal_villes/1/edit
  def edit
    @code_postal_ville = CodePostalVille.find(params[:id])
  end

  # POST /code_postal_villes
  # POST /code_postal_villes.xml
  def create
    @code_postal_ville = CodePostalVille.new(params[:code_postal_ville])

    respond_to do |format|
      if @code_postal_ville.save
        format.html { redirect_to(@code_postal_ville, :notice => 'Code postal ville was successfully created.') }
        format.xml  { render :xml => @code_postal_ville, :status => :created, :location => @code_postal_ville }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @code_postal_ville.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /code_postal_villes/1
  # PUT /code_postal_villes/1.xml
  def update
    @code_postal_ville = CodePostalVille.find(params[:id])

    respond_to do |format|
      if @code_postal_ville.update_attributes(params[:code_postal_ville])
        format.html { redirect_to(@code_postal_ville, :notice => 'Code postal ville was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @code_postal_ville.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /code_postal_villes/1
  # DELETE /code_postal_villes/1.xml
  def destroy
    @code_postal_ville = CodePostalVille.find(params[:id])
    @code_postal_ville.destroy

    respond_to do |format|
      format.html { redirect_to(code_postal_villes_url) }
      format.xml  { head :ok }
    end
  end
end
