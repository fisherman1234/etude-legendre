class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout
  before_filter :define_locale

  def define_locale
    if params[:locale] == nil
      I18n.locale = 'fr'
    else
      I18n.locale = params[:locale]
    end
  end

    private

    def layout

      # or turn layout off for every devise controller:
      !devise_controller? && "application"
    end
  
  
end
