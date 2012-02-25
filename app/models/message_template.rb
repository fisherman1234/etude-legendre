class MessageTemplate < ActiveRecord::Base
  has_many :communications
  has_and_belongs_to_many :type_acteurs
  belongs_to :parametre_cabinet
  
  
  def render_final_file(concom_id)
    @message_template = self
    @concom = ContactToCommunication.find(concom_id)
    @communication = @concom.communication
    @dossier = @communication.dossier
    @other_recipients = @communication.contact_to_communications.find(:all, :conditions => ["id != ?", @concom.id])
    @expert = @dossier.user
    
    @template_signature = Liquid::Template.parse(@expert.signature_lettres)
    @template = Liquid::Template.parse(@message_template.letter_body)
    @template_sujet = Liquid::Template.parse(@message_template.mail_subject)
    
    @margins_top = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_haut || 10)/25.4).to_s+'in'
    @margins_bottom = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_bas || 10)/25.4).to_s+'in'
    @margins_right = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_droite || 10)/25.4).to_s+'in'
    @margins_left = "%.2f" % ((@dossier.parametres_cabinet.en_tete_marge_gauche || 10)/25.4).to_s+'in'
    
    html = ActionView::Base.new(Rails.configuration.paths.app.views.first).render(:template => 'message_templates/show.html.haml', :format=>'html',:layout => "layouts/pdf.html.pdf.haml", :locals => {
      :@message_template=> @message_template, 
      :@concom => @concom, 
      :@template_signature => Liquid::Template.parse(@expert.signature_lettres), 
      :@template => Liquid::Template.parse(@message_template.letter_body), 
      :@template_sujet => Liquid::Template.parse(@message_template.mail_subject), 
      :@other_recipients=>@communication.contact_to_communications.find(:all, :conditions => ["id != ? and transmission_medium_id != 1", @concom.id]), 
      :@other_copy=>@communication.contact_to_communications.find(:all, :conditions => ["id != ? and transmission_medium_id = 1", @concom.id]), 
      
      :@communication=>@concom.communication, 
      :@dossier=>@communication.dossier, 
      :@expert=> @dossier.user})
    
    puts "html rendered"
    
    kit = PDFKit.new(html, :print_media_type => true, :page_size => 'A4', :no_background => true,         
    :margin_top => @margins_top, 
    :margin_right =>@margins_right,
    :margin_left => @margins_left,
    :footer_right => "Page [page]/[toPage]", 
    :footer_font_size => "10")
    kit = kit.to_pdf
    puts "text pdf content rendered"
    ##stamping
    file_top = File.open("#{RAILS_ROOT}/tmp/myfile_#{Process.pid}",'w')
    file_top.write kit.to_s
    
    file_bak = open(@dossier.parametres_cabinet.en_tete)
    puts "remote background fetched"
    pdf_output = `pdftk #{file_top.path} background #{file_bak.path} output - flatten`
    puts "output generated"
    file = StringIO.new(pdf_output) #mimic a real upload file
        file.class.class_eval { attr_accessor :original_filename, :content_type } #add attr's that paperclip needs
        file.original_filename = "labels.pdf"
        file.content_type = "application/pdf"
    @concom.final_file = file
    @concom.save
    puts "pdf uploaded"
    return  @concom.generate_template_doc_link
  end
end
