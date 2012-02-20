class CommunicationsController < ApplicationController
  before_filter :authenticate_user!
  require 'zip/zip'
  require 'zip/zipfilesystem'
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

    @communication = Communication.new(params[:communication])
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
    @communication.generate_attachments_docs
    book = @communication.generate_summary_spreadsheet
    book.write "#{RAILS_ROOT}/tmp/communication.xls"
    
    
    file_name = "communication#{(0...8).map{65.+(rand(25)).chr}.join}.zip"
    pathZip = "#{RAILS_ROOT}/tmp/#{file_name}"
    zipfile = Zip::ZipFile.open(pathZip, Zip::ZipFile::CREATE)
    zipfile.add( "description.xls", "#{RAILS_ROOT}/tmp/communication.xls")
    
    @communication.contact_to_communications.each do |concom|
       begin
          a = open(AWS::S3::S3Object.url_for(concom.final_file.path, concom.final_file.bucket_name, :expires_in => 1.year))
          zipfile.add(concom.transmission_medium.try(:description).to_s+'-'+concom.contact.full_name.gsub(/[^0-9A-Za-z]/, '').to_s+'.pdf', a)
        rescue
        end
    end
    zipfile.commit
   

    send_file pathZip, :type => 'application/zip',
                           :disposition => 'attachment',
                           :filename => file_name,:stream => false
    
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
