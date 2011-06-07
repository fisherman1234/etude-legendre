class CommunicationsController < ApplicationController
  # GET /communications
  # GET /communications.xml
  def index
    @communications = Communication.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @communications }
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
    @dossier = Dossier.find(params[:dossier])
    @communication = Communication.new(:dossier_id=>@dossier.id)
    puts @communication.dossier_id
    @contacts = []
    @documents = []
    @dossier.acteurs.each do |acteur|
      acteur.contact_acteurs.each do |contact_acteurs|
        @contacts.push(contact_acteurs.contact)
        contact_to_communication = @communication.contact_to_communications.build(:partie=>acteur.description,:contact_id=>contact_acteurs.contact.id, :recipient => contact_acteurs.contact.prenom+' '+contact_acteurs.contact.nom,:transmission_medium_id => contact_acteurs.contact.contact_medium_id, :adresse1=>contact_acteurs.contact.adresse1,:adresse2=>contact_acteurs.contact.adresse2, :adresse3=>contact_acteurs.contact.adresse3, :code_postal=>contact_acteurs.contact.code_postal, :ville => contact_acteurs.contact.ville, :pays=>contact_acteurs.contact.pays, :email=> contact_acteurs.contact.email, :fax=>contact_acteurs.contact.fax, :genre_adresse=>contact_acteurs.contact.genre_adresse, :genre_lettre=>contact_acteurs.contact.genre_lettre, :references_courrier=>contact_acteurs.references)
      end
    end
    @dossier.documents.each do |document_item|
        @documents.push(document_item)
        document_to_communication = @communication.document_to_communications.build(:document_id=>document_item.id)
    end
    respond_to do |format|
      format.html # new_communication.html.erb
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

    respond_to do |format|
      if @communication.save
        format.html { redirect_to(@communication, :notice => 'Communication was successfully created.') }
        format.xml  { render :xml => @communication, :status => :created, :location => @communication }
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
    end
  end
end
