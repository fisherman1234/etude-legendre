# encoding: utf-8
class ContactsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /contacts
  # GET /contacts.xml
  def index
    if params[:term] != nil
      if params[:type] != nil
        if params[:institution] != nil
          @contacts = current_user.parametres_cabinet.contacts.find(:all, :conditions => ["(LOWER(nom) LIKE LOWER(?) or LOWER(prenom) LIKE LOWER(?)) and institution_id=? and type_intervenant_id=?", "%#{params[:term]}%", "%#{params[:term]}%", "#{params[:institution]}", "#{params[:type]}"])
        else
          @contacts = current_user.parametres_cabinet.contacts.find(:all, :conditions => ["(LOWER(nom) LIKE LOWER(?) or LOWER(prenom) LIKE LOWER(?)) and type_intervenant_id=?", "%#{params[:term]}%", "%#{params[:term]}%", "#{params[:type]}"])
        end
      else
        @contacts = current_user.parametres_cabinet.contacts.find(:all, :conditions => ["LOWER(nom) LIKE LOWER(?) or LOWER(prenom) LIKE LOWER(?)", "%#{params[:term]}%", "%#{params[:term]}%"])
      end
    else
      @contacts = current_user.parametres_cabinet.contacts.all
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @contacts }
      format.js {render :json => @contacts.map {|p| {  :label => p.full_name  , :value => p.id}} }
      format.json {render :json => {"success"=>true,"data"=>@contacts.map {|p| p.attributes.merge(:nom_complet => p.full_name)}}}
      
    end
  end

  # GET /contacts/1
  # GET /contacts/1.xml
  def show
    @contact = Contact.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @contact }
    end
  end

  # GET /contacts/new
  # GET /contacts/new.xml
  def new
    @contact = Contact.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @contact }
    end
  end

  # GET /contacts/1/edit
  def edit
    @contact = Contact.find(params[:id])
  end

  # POST /contacts
  # POST /contacts.xml
  def create
    params[:contact].delete(:id)
    
    @contact = Contact.new(params[:contact])
    old_notes = @contact.notes
    
    if params[:contact][:notes].present?
      old_notes = params[:contact][:notes]
      @contact.notes = params[:contact][:notes].encode('UTF-8', 'ISO-8859-1')
    end    

    @contact.parametres_cabinet_id = current_user.parametres_cabinet_id
    
    respond_to do |format|
      if @contact.save
        format.html { redirect_to(@contact, :notice => 'Contact was successfully created.') }
        format.xml  { render :xml => @contact, :status => :created, :location => @contact }
        format.json  { render :json => { :success => true, :message => "Created Contact  #{@contact.id}", :data => @contact.attributes.merge(:nom_complet => @contact.full_name, "notes" => old_notes)}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @contact.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /contacts/1
  # PUT /contacts/1.xml
  def update
    @contact = Contact.find(params[:id])
    params[:contact].delete(:id)
    old_notes = @contact.notes

    if params[:contact][:notes].present?
      old_notes = params[:contact][:notes]
      params[:contact][:notes] = params[:contact][:notes].encode('UTF-8', 'ISO-8859-1')
    end
    respond_to do |format|
      if @contact.update_attributes(params[:contact])
        format.html { redirect_to(@contact, :notice => 'Contact was successfully updated.') }
        format.xml  { head :ok }
        format.json  { render :json => { :success => true, :message => "Updated Contact  #{@contact.id}", :data => @contact.attributes.merge(:nom_complet => @contact.full_name, "notes" => old_notes)}}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @contact.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.xml
  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy

    respond_to do |format|
      format.html { redirect_to(contacts_url) }
      format.xml  { head :ok }
      format.json  { render :json => { :success => true, :message => "Deleted Contact  #{@contact.id}", :data => []}}
    end
  end
end
