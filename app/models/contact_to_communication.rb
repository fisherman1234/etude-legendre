class ContactToCommunication < ActiveRecord::Base
  belongs_to :contact
  belongs_to :communication
  belongs_to :contact_acteur
  belongs_to :transmission_medium
  attr_accessor :partie
  has_attached_file :final_file,
    :storage => :s3,
    :bucket => 'etude-legendre',
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
    
  liquid_methods :moyenTransmission, :nomDestinataire, :prenomDestinataire, :adresse1, :adresse2, :adresse3, :code_postal, :pays, :telephone, :email, :fax, :genre_lettre, :genre_adresse, :references_courrier, :ville
  

  
  def moyenTransmission
    return self.transmission_medium.description
  end
  
  def nomDestinataire
    return self.contact.nom
  end
  
  def prenomDestinataire
    return self.contact.prenom
  end
  
  def generate_email_doc
    a = "R_64d5c9cba22c95c6a0048afcc7bb4d90"
    b = "thibaultpoisson"
    bitly = Bitly.new(b,a)
    
    static_files = self.communication.documents.map {|document| bitly.shorten(AWS::S3::S3Object.url_for(document.file.path, document.file.bucket_name, :expires_in => 1.year)).short_url }
    return static_files
  end
  
  def generate_template_doc_link
    a = "R_64d5c9cba22c95c6a0048afcc7bb4d90"
    b = "thibaultpoisson"
    bitly = Bitly.new(b,a)
    
    static_files =  bitly.shorten(AWS::S3::S3Object.url_for(self.final_file.path, self.final_file.bucket_name, :expires_in => 1.year)).short_url
    return static_files
  end
  
end
