class CommunicationsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /communications
  # GET /communications.xml
  def index
    if (params[:dossier])
      @dossier = Dossier.find(params[:dossier])
      @communications = @dossier.communications
    else
      @communications = []
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @communications }
      format.json {render :json => {"success"=>true,"data"=>@communications}}
      
    end
  end

  # GET /communications/1
  # GET /communications/1.xml
  def show
    @communication = Communication.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @communication }
      format.pdf {
          html = render_to_string( :layout => "pdf.html.pdf", :action => "show.html.haml")
          kit = PDFKit.new(html, :print_media_type => true)
          send_data(kit.to_pdf, :filename => "labels.pdf", :type => 'application/pdf', :disposition => 'inline')
          return # to avoid double render call
        }      
    end
  end

  # GET /communications/new
  # GET /communications/new.xml
  def new
    @communication = Communication.new(:dossier_id=>@dossier.id)
    @communication.dossier_id = params[:dossier]
    

    respond_to do |format|
      format.html # new_communication.html.erb
      format.json {render :json => {"success"=>true,"data"=>@communication}}
      
    end
  end

  # GET /communications/1/edit
  def edit
    @communication = Communication.find(params[:id])
    @contacts = []
    @documents = []
    @communication.dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteurs|
        @contacts.push(contact_acteurs.contact)
      end
    end

  end

  # POST /communications
  # POST /communications.xml
  def create
    @communication = Communication.new()
    @communication.dossier_id = params[:dossier]
    @communication.activite_id = params[:activite_id]
    
    respond_to do |format|
      if @communication.save
        format.html { redirect_to(@communication, :notice => 'Communication was successfully created.') }
        format.xml  { render :xml => @communication, :status => :created, :location => @communication }
        format.json {render :json => {"success"=>true,"data"=>@communication}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @communication.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /communications/1
  # PUT /communications/1.xml
  def update
    @communication = Communication.find(params[:id])

    respond_to do |format|
      if @communication.update_attributes(params[:communication])
        format.html { redirect_to(@communication, :notice => 'Communication was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@communication}}
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @communication.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /communications/1
  # DELETE /communications/1.xml
  def destroy
    @communication = Communication.find(params[:id])
    @communication.destroy

    respond_to do |format|
      format.html { redirect_to(communications_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
  
  def generate_attachments_docs
    @communication = Communication.find(params[:id])
    @communication.contact_to_communications.where('transmission_medium_id != 0').each do |concom|
      concom.render_final_file  
    end
    redirect_to :action => "review", :id => params[:id]
  end
  
  def send_documents
    @communication = Communication.find(params[:id])
    @communication.contact_to_communications.where(:transmission_medium_id => 1).each do |concom|
      concom.send_communication  
    end
  end
  
  def review
    @communication = Communication.find(params[:id])
    respond_to do |format|
      format.html # index.html.erb
    end
  end
  
end
