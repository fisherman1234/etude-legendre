class RemindersController < ApplicationController
  # GET /reminders
  # GET /reminders.xml
  def index

    @reminders = current_user.reminders
    

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @reminders }
      format.json {render :json => {"success"=>true,"data"=>@reminders}}
      
    end
  end

  # GET /reminders/1
  # GET /reminders/1.xml
  def show
    @reminder = Reminder.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @reminder }
    end
  end

  # GET /reminders/new
  # GET /reminders/new.xml
  def new
    @reminder = Reminder.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @reminder }
    end
  end

  # GET /reminders/1/edit
  def edit
    @reminder = Reminder.find(params[:id])
  end

  # POST /reminders
  # POST /reminders.xml
  def create
    @reminder = Reminder.new(params[:reminder])
    @reminder.dossier_id = params[:dossier]
    @reminder.user_id = current_user.id
    respond_to do |format|
      if @reminder.save
        format.html { redirect_to(@reminder, :notice => 'Reminder was successfully created.') }
        format.xml  { render :xml => @reminder, :status => :created, :location => @reminder }
        format.json {render :json => {"success"=>true,"data"=>@reminder}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @reminder.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /reminders/1
  # PUT /reminders/1.xml
  def update
    @reminder = Reminder.find(params[:id])
    @reminder.dossier_id = params[:dossier]
     @reminder.user_id = current_user.id
    respond_to do |format|
      if @reminder.update_attributes(params[:reminder])
        format.html { redirect_to(@reminder, :notice => 'Reminder was successfully updated.') }
        format.json {render :json => {"success"=>true,"data"=>@reminder}}
        
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @reminder.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /reminders/1
  # DELETE /reminders/1.xml
  def destroy
    @reminder = Reminder.find(params[:id])
    @reminder.destroy

    respond_to do |format|
      format.html { redirect_to(reminders_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
end
