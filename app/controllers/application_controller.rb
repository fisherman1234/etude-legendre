class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout

    private

    def layout

      # or turn layout off for every devise controller:
      !devise_controller? && "application"
    end
  
  
end
