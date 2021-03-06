class ParametresCabinet < ActiveRecord::Base
  require 'zip/zip'
  require 'zip/zipfilesystem'
  require 'csv'
  
  has_many :users, :dependent => :destroy
  has_many :dossiers
  has_many :type_expertises
  has_many :type_decisions
  has_many :contacts
  has_many :type_etat_dossiers
  has_many :type_civilites_correspondances
  has_many :taux_tvas
  has_many :unites
  has_many :items
  has_many :categories
  has_many :institutions
  has_many :type_intervenants
  has_many :type_institutions
  has_many :type_documents
  has_many :qualite_procedurales
  has_many :type_activites
  has_many :categories
  has_many :message_templates
  after_create :seed_data
  
  
  has_attached_file :logo,
    :storage => :s3,
    :bucket => 'etude-legendre',
    :url => "/system/:hash.:extension",
    :hash_secret => "longSecretString",
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
    
  has_attached_file :papier_en_tete,
    :storage => :s3,
    :url => "/system/:hash.:extension",
    :hash_secret => "longSecretString",
    :bucket => 'etude-legendre',
    :s3_permissions => 'authenticated-read',
    :s3_credentials => {
      :access_key_id => 'AKIAJN75XNBEIO2RQGMQ',
      :secret_access_key => '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'
    }
    

  
  validates_attachment_content_type :logo, :content_type => ['image/jpeg', 'image/png']
  
  liquid_methods :logo_path,  :nom_cabinet, :adresse1, :adresse2, :adresse3, :code_postal, :ville, :pays, :telephone, :fax, :email, :site_internet, :en_tete_lettres, :pied_page_lettres, :marge_gauche_lettres, :siret, :naf

  def seed_data
    seed_file = File.join(Rails.root, 'db', 'seeds.yml')
    config = YAML::load_file(seed_file)
    config['categories'].each do |l|
      a = Categorie.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['items'].each do |l|
      a = Item.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['taux_tvas'].each do |l|
      a = TauxTva.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_acteurs'].each do |l|
      a = TypeActeur.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_activites'].each do |l|
      a = TypeActivite.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_adresses'].each do |l|
      a = TypeAdresse.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_decisions'].each do |l|
      a = TypeDecision.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_etat_dossiers'].each do |l|
      a = TypeEtatDossier.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_expertises'].each do |l|
      a = TypeExpertise.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_institutions'].each do |l|
      a = TypeInstitution.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_intervenants'].each do |l|
      a = TypeIntervenant.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_status_consignations'].each do |l|
      a = TypeStatusConsignation.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['unites'].each do |l|
      a = Unite.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['qualite_procedurales'].each do |l|
      a = QualiteProcedurale.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_civilite_correspondance'].each do |l|
      a = TypeCivilitesCorrespondance.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
    config['type_documents'].each do |l|
      a = TypeDocument.new(l)
      a.parametres_cabinet_id = id
      a.save
    end
  end

  def logo_path
    AWS::S3::S3Object.url_for(self.logo.path, self.logo.bucket_name, :expires_in => 99.year)
  end
  
  def en_tete
    AWS::S3::S3Object.url_for(self.papier_en_tete.path, self.papier_en_tete.bucket_name, :expires_in => 10.year)
  end
  
  def export_full
    @dossiers = self.dossiers
    file_name = "export_cabinet_#{id}.zip"
    pathZip = "#{RAILS_ROOT}/tmp/#{file_name}"
    %x[rm #{pathZip}]
    zipfile = Zip::ZipFile.open(pathZip, Zip::ZipFile::CREATE)
    
    root_items = %w[User Institution Contact Dossier]
    root_items.each do |root_item|
      file_name = "export_cabinet_#{id}_#{root_item}.csv"
      first = 0
      CSV.open("#{RAILS_ROOT}/tmp/#{file_name}", "w") do |csv|
        eval(root_item).where(:parametres_cabinet_id => self.id).each do |object|
          if first == 0
            csv << object.attributes.keys
            first = 1
          end
          csv << object.attributes.values
        end
      end
      zipfile.add("#{file_name}", "#{RAILS_ROOT}/tmp/#{file_name}")
    end
    
    child_items = %w[Expense Reminder Document]
    child_items.each do |child_item|
      file_name = "export_cabinet_#{id}_#{child_item}.csv"
      CSV.open("#{RAILS_ROOT}/tmp/#{file_name}", "w") do |csv|
        first = 0
        eval(child_item).where('dossier_id in (?)', @dossiers.collect{|l| l.id}).flatten.each do |object|
          if first == 0
            csv << object.attributes.keys
            first = 1
          end
          csv << object.attributes.values
        end
      end
      zipfile.add("#{file_name}", "#{RAILS_ROOT}/tmp/#{file_name}")
    end
    zipfile.commit
    return pathZip
  end
end


