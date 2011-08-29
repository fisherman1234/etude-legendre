class MyUserController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @users = current_user.parametres_cabinet.users
   
    respond_to do |format|
     
      format.json {render :json => {"success"=>true,"data"=>@users.map {|p| p.attributes.merge(:nom_complet => p.full_name)}}}
    end
  end


  # GET /users/1
  # GET /users/1.xml
  def show
    if params[:id]
      @user = User.find(params[:id])
    else
      @user = current_user
    end
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
    end
  end



  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.xml
  def create
    

    
    @user = User.new(params[:my_user])
    @user.parametres_cabinet_id = current_user.parametres_cabinet_id
    @user.save
    

    respond_to do |format|
        format.html { redirect_to(@user, :notice => 'User was successfully created.') }
        format.xml  { render :xml => @user, :status => :created, :location => @user }
        format.json {render :json => {"success"=>true,"data"=>@user}}

    end
  end

  # PUT /users/1
  # PUT /users/1.xml
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:my_user])
        format.html { redirect_to(@user, :notice => 'User was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@user.attributes.merge(:nom_complet => @user.full_name)}}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /parametres_cabinets/1
  # DELETE /parametres_cabinets/1.xml
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(parametres_cabinets_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
    end
  end
  
  
  
end
