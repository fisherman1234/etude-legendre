require 'tempfile' 

class MessageTemplatesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /message_templates
  # GET /message_templates.xml
  
  #uses_tiny_mce 
  def index
    @message_templates = current_user.parametres_cabinet.message_templates.all + MessageTemplate.where('parametres_cabinet_id = 0')

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @message_templates }
      format.json {render :json => {"success"=>true,"data"=>@message_templates}}
      
    end
  end

  # GET /message_templates/1
  # GET /message_templates/1.xml
  def show
    
    render :nothing => true, :status => 200, :content_type => 'text/html'
    
    # @message_template = MessageTemplate.find(params[:id])
    #     @concom = ContactToCommunication.find(params[:concom_id])
    #     @communication = @concom.communication
    #     @dossier = @communication.dossier
    #     @other_recipients = @communication.contact_to_communications.find(:all, :conditions => ["id != ?", @concom.id])
    #     @expert = @dossier.user
    #     
    #     @template_signature = Liquid::Template.parse(@expert.signature_lettres)
    #     @template = Liquid::Template.parse(@message_template.letter_body)
    #     @template_sujet = Liquid::Template.parse(@message_template.mail_subject)
    #     
    #     @margins_top = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_haut || 10)/25.4).to_s+'in'
    #     @margins_bottom = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_bas || 10)/25.4).to_s+'in'
    #     @margins_right = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_droite || 10)/25.4).to_s+'in'
    #     @margins_left = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_gauche || 10)/25.4).to_s+'in'
    # 
    #     
    #     respond_to do |format|
    #       format.html {render :layout => "pdf.html.pdf"} # show.html.erb
    #       format.xml  { render :xml => @message_template }
    #       format.pdf {
    #           html = render_to_string( :layout => "pdf.html.pdf", :action => "show.html.haml")
    #           kit = PDFKit.new(html, :print_media_type => true, :page_size => 'A4', :no_background => true,         
    #           :margin_top => @margins_top, 
    #           :margin_right =>@margins_right,
    #           :margin_left => @margins_left,
    #           :footer_right => "Page [page]/[toPage]", 
    #           :footer_font_size => "10")
    #           kit = kit.to_pdf
    #           
    #           ##stamping
    #           file_top = File.open("#{RAILS_ROOT}/tmp/myfile_#{Process.pid}",'w')
    #           file_top.write kit.to_s
    # 
    #           
    #           file_bak = open(@dossier.parametres_cabinet.en_tete)
    #                     
    #           pdf_output = `pdftk #{file_top.path} background #{file_bak.path} output - flatten`
    #           
    #           
    #           file = StringIO.new(pdf_output) #mimic a real upload file
    #               file.class.class_eval { attr_accessor :original_filename, :content_type } #add attr's that paperclip needs
    #               file.original_filename = "labels.pdf"
    #               file.content_type = "application/pdf"
    #           @concom.final_file = file
    #           @concom.save
    #           send_data(pdf_output, :filename => "labels.pdf", :type => 'application/pdf', :disposition => 'inline')
    #           return # to avoid double render call
    #         }
    #     end
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
    @message_template.parametres_cabinet_id = current_user.parametres_cabinet_id

    respond_to do |format|
      if @message_template.save
        format.html { redirect_to(@message_template, :notice => 'Message template was successfully created.') }
        format.xml  { render :xml => @message_template, :status => :created, :location => @message_template }
        format.json {render :json => {"success"=>true,"data"=>@message_template}}
        
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @message_template.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /message_templates/1
  # PUT /message_templates/1.xml
  def update

    
    @message_template = MessageTemplate.find(params[:id])
    @message_template.parametres_cabinet_id = current_user.parametres_cabinet_id

    @message_template.update_attributes(params[:message_template])    
    respond_to do |format|
        format.html { head :ok }
        format.xml  { head :ok }
        format.json {render :json => {"success"=>true,"data"=>@message_template}}
        
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
  

  def mark_as_global
    @message_template = MessageTemplate.find(params[:id])
    @copy = MessageTemplate.new
    @copy.message_body = @message_template.message_body
    @copy.mail_subject = @message_template.mail_subject
    @copy.letter_body = @message_template.letter_body
    @copy.description = @message_template.description
    @copy.parametres_cabinet_id = 0
    @copy.save
    redirect_to '/message_templates'
  end

end
