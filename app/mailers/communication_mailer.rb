class CommunicationMailer < ActionMailer::Base
  default :from => "from@example.com"
  
  def send_communication(concom)
      recipients concom.email
      from "thibault.poisson.etude.legendre@gmail.com"
      subject Liquid::Template.parse(concom.communication.message_template.mail_subject).render('dossier' => concom.communication.dossier, 'destinataire'=> concom, 'expert' => concom.communication.dossier.user, 'communication' => concom.communication, 'concom' => concom) 
      sent_on Time.now
      body :body_content => Liquid::Template.parse(concom.communication.message_template.message_body).render('dossier' => concom.communication.dossier, 'destinataire'=> concom, 'expert' => concom.communication.dossier.user, 'communication' => concom.communication, 'concom' => concom), :concom => concom
  end
end
