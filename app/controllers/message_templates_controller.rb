class MessageTemplatesController < ApplicationController
  # GET /message_templates
  # GET /message_templates.xml
  
  uses_tiny_mce 
  def index
    @message_templates = MessageTemplate.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @message_templates }
    end
  end

  # GET /message_templates/1
  # GET /message_templates/1.xml
  def show
    @message_template = MessageTemplate.find(params[:id])
    
    @concom = ContactToCommunication.find(params[:concom_id])
    @communication = @concom.communication
    @dossier = @communication.dossier
    @template = Liquid::Template.parse(@message_template.message_body)
    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @message_template }
    end
  end

  # GET /message_templates/new
  # GET /message_templates/new.xml
  def new
    @message_template = MessageTemplate.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @message_template }
    end
  end

  # GET /message_templates/1/edit
  def edit
    @message_template = MessageTemplate.find(params[:id])
  end

  # POST /message_templates
  # POST /message_templates.xml
  def create
    @message_template = MessageTemplate.new(params[:message_template])

    respond_to do |format|
      if @message_template.save
        format.html { redirect_to(@message_template, :notice => 'Message template was successfully created.') }
        format.xml  { render :xml => @message_template, :status => :created, :location => @message_template }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @message_template.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /message_templates/1
  # PUT /message_templates/1.xml
  def update
    params[:message_template][:type_acteur_ids] ||= []
    @message_template = MessageTemplate.find(params[:id])
    @message_template.type_acteur_ids = params[:message_template][:type_acteur_ids]
    @message_template.message_body = params[:message_template][:message_body]
    @message_template.save
    
    respond_to do |format|
        format.html { head :ok }
        format.xml  { head :ok }
    end
  end

  # DELETE /message_templates/1
  # DELETE /message_templates/1.xml
  def destroy
    @message_template = MessageTemplate.find(params[:id])
    @message_template.destroy

    respond_to do |format|
      format.html { redirect_to(message_templates_url) }
      format.xml  { head :ok }
    end
  end
end
