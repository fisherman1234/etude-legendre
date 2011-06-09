# Load the rails application
require File.expand_path('../application', __FILE__)


EtudeLegendre::Application.configure do
  DATABASE_OPERATOR = {
      :like_operator => "LIKE"
    }

config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  :address              => 'smtp.gmail.com',
  :port                 => 587,
  :domain               => 'gmail.com',
  :user_name            => 'thibault.poisson.etude.legendre@gmail.com',
  :password             => 'tomaterouge',
  :authentication       => 'plain',
  :enable_starttls_auto => true  }
end

# Initialize the rails application
EtudeLegendre::Application.initialize!
