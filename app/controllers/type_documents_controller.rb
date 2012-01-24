class TypeDocumentsController < ApplicationController
  # GET /type_documents
  # GET /type_documents.xml
  def index
    @type_documents =  current_user.parametres_cabinet.type_documents.all
    

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @type_documents }
    end
  end

  # GET /type_documents/1
  # GET /type_documents/1.xml
  def show
    @type_document = TypeDocument.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @type_document }
    end
  end

  # GET /type_documents/new
  # GET /type_documents/new.xml
  def new
    @type_document = TypeDocument.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @type_document }
    end
  end

  # GET /type_documents/1/edit
  def edit
    @type_document = TypeDocument.find(params[:id])
  end

  # POST /type_documents
  # POST /type_documents.xml
  def create
    @type_document = TypeDocument.new(params[:type_document])
    @type_document.parametres_cabinet_id = current_user.parametres_cabinet_id
    respond_to do |format|
      if @type_document.save
        format.html { redirect_to(@type_document, :notice => 'Type document was successfully created.') }
        format.xml  { render :xml => @type_document, :status => :created, :location => @type_document }
        format.json {render :json => {"success"=>true,"data"=>@type_document}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @type_document.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /type_documents/1
  # PUT /type_documents/1.xml
  def update
    @type_document = TypeDocument.find(params[:id])

    respond_to do |format|
      if @type_document.update_attributes(params[:type_document])
        format.html { redirect_to(@type_document, :notice => 'Type document was successfully updated.') }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@type_document}}
        
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @type_document.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /type_documents/1
  # DELETE /type_documents/1.xml
  def destroy
    @type_document = TypeDocument.find(params[:id])
    @type_document.destroy

    respond_to do |format|
      format.html { redirect_to(type_documents_url) }
      format.xml  { head :ok }
      format.json {render :json => {"success"=>true,"data"=>[]}}
      
    end
  end
end
