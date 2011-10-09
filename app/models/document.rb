class Document < ActiveRecord::Base
  belongs_to :dossier
  belongs_to :contact
  after_commit :set_relationship
  has_many :activites, :through => :activite_to_documents
  has_many :activite_to_documents, :dependent => :destroy
  has_many :communications, :through => :document_to_communications
  has_many :document_to_communications
  has_attached_file :file,
    :storage => :s3,
    :bucket => 'etude-legendre',
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
    
  attr_accessor :short_link
  attr_accessor :long_link
  
    def set_relationship
      if self.document_to_communications
        puts "*********************"
        self.document_to_communications.last.update_attribute(:included_in_communication, 1)
      end
    end
    
    
    def generate_link
      a = "R_64d5c9cba22c95c6a0048afcc7bb4d90"
      b = "thibaultpoisson"
      bitly = Bitly.new(b,a)

      url = bitly.shorten(AWS::S3::S3Object.url_for(self.file.path, self.file.bucket_name, :expires_in => 1.year)).short_url
      return url
    end
    
     def generate_long_link
        a = "R_64d5c9cba22c95c6a0048afcc7bb4d90"
        b = "thibaultpoisson"
        bitly = Bitly.new(b,a)

        url = AWS::S3::S3Object.url_for(self.file.path, self.file.bucket_name, :expires_in => 1.year)
        return url
      end
    
    
    /
    ##Flight mode
    def generate_link
      return self.file.path
    end
    
     def generate_long_link
        return self.file.path
      end
    */

end
