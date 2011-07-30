class UsersController < ApplicationController
  before_filter :authenticate_user!, :only => [:show, :current_user, :destroy_current_user_session]
  


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
  #def create
  #  @user = User.new(params[:user])
  #  puts "********"
  #  respond_to do |format|
  #      format.html { redirect_to(@user, :notice => 'User was successfully created.') }
  #      format.xml  { render :xml => @user, :status => :created, :location => @user }
  #    else
  #      format.html { render :action => "new" }
  #      format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
  #    end
  #  end
  #end

  # PUT /users/1
  # PUT /users/1.xml
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(@user, :notice => 'User was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end


  
  # Current user
  # GET /users/current_user_signed_in
  def current_user_signed_in
    respond_to do |format|
      format.js  { render :json => current_user }
    end
  end
  
  def destroy_current_user_session
    reset_session
    session[:current_user_id] = nil
    return :nothing
  end
  
  def connexion
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @user }
    end
  end
end
