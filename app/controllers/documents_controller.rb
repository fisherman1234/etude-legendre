class DocumentsController < ApplicationController
  before_filter :authenticate_user!
  skip_before_filter :verify_authenticity_token
   
  # GET /documents
  # GET /documents.xml
  def index
    if (params[:dossier])
      if params[:clear].present? && params[:clear] == 'true'
        @documents = []
      elsif params[:activite_id].present? && params[:activite_id]!='undefined'
          @documents = []
          ActiviteToDocument.where(:activite_id => params[:activite_id]).each do |a2d|
            @documents.push(a2d.document)
          end
      else
        @dossier = Dossier.find(params[:dossier])
        @documents = @dossier.documents
      end
    else
      @documents = []
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @documents }
      format.json {render :json => {"success"=>true,"data"=>@documents.map {|p| p.attributes.merge(:short_link => p.generate_link,:long_link => p.generate_long_link )}, :totalSize =>@documents.count}}

    end
  end

  # GET /documents/1
  # GET /documents/1.xml
  def show
    @document = Document.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @document }
    end
  end

  # GET /documents/new
  # GET /documents/new.xml
  def new
    @document = Document.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @document }
    end
  end

  # GET /documents/1/edit
  def edit
    @document = Document.find(params[:id])
  end

  # POST /documents
  # POST /documents.xml
  def create
    @document = Document.new()
    @document.description = params[:description]
    @document.file = params[:file]
    @document.dossier_id = params[:dossier_id]
    @document.contact_id = params[:contact_id]
    @document.type_document_id = params[:type_document_id]
    
    if params[:activite_id].present? && params[:activite_id]!='undefined'
      @document.activite_to_documents.build(:activite_id => params[:activite_id])
    end
    
    @document.save
    

    
    resp = {"success"=>true,"data"=>@document.attributes.merge(:short_link => @document.generate_link,:long_link => @document.generate_long_link )}.to_json
    render :text => resp
    
  end

  # PUT /documents/1
  # PUT /documents/1.xml
  def update
    @document = Document.find(params[:id])
    @document.description = params[:description]
    @document.file = params[:file]
    @document.dossier_id = params[:dossier_id]
    @document.contact_id = params[:contact_id]
    @document.type_document_id = params[:type_document_id]
    
    @document.save
    
    resp = {"success"=>true,"data"=>@document.attributes.merge(:short_link => @document.generate_link,:long_link => @document.generate_long_link )}.to_json
    render :text => resp
  end

  # DELETE /documents/1
  # DELETE /documents/1.xml
  def destroy
    @document = Document.find(params[:id])
    @document.destroy

    respond_to do |format|
      format.html { redirect_to(documents_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
    end
  end
end
