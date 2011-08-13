class ParametresCabinet < ActiveRecord::Base
  has_many :users
  has_many :dossiers
  has_many :type_expertises
  has_many :type_decisions
  has_many :contacts
  has_many :type_etat_dossiers
  has_many :taux_tvas
  has_many :unites
  has_many :items
  has_many :categories

  has_attached_file :logo,
    :storage => :s3,
    :bucket => 'etude-legendre',
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
    
  has_attached_file :papier_en_tete,
    :storage => :s3,
    :bucket => 'etude-legendre',
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
  
  validates_attachment_content_type :logo, :content_type => ['image/jpeg', 'image/png']
  
  liquid_methods :logo_path,  :nom_cabinet, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :email, :site_internet, :en_tete_lettres, :pied_page_lettres, :marge_gauche_lettres, :siret, :naf

  def logo_path
    AWS::S3::S3Object.url_for(self.logo.path, self.logo.bucket_name, :expires_in => 99.year)
  end
  
  def en_tete
    AWS::S3::S3Object.url_for(self.papier_en_tete.path, self.papier_en_tete.bucket_name, :expires_in => 10.year)
  end
end


