class CommunicationMailer < ActionMailer::Base
  default :from => "from@example.com"
  
  def send_communication(concom)
      recipients concom.email
      from "thibault.poisson.etude.legendre@gmail.com"
      subject Liquid::Template.parse(concom.communication.subject_id).render('dossier' => concom.communication.dossier, 'destinataire'=> concom, 'expert' => concom.communication.dossier.user, 'communication' => concom.communication, 'concom' => concom) 
      sent_on Time.now
      content_type "text/html"
      body :body_content => Liquid::Template.parse(concom.communication.description).render('dossier' => concom.communication.dossier, 'destinataire'=> concom, 'expert' => concom.communication.dossier.user, 'communication' => concom.communication, 'concom' => concom), :concom => concom
  end
end
