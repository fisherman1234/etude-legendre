# config/initializers/pdfkit.rb

PDFKit.configure do |config|
  config.wkhtmltopdf = Rails.root.join('bin', 'wkhtmltopdf-amd64').to_s if RAILS_ENV == 'production'
  config.root_url = "http://localhost" # Use only if your external hostname is unavailable on the server.
  
end