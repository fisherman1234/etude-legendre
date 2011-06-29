class ApplicationController < ActionController::Base
  protect_from_forgery
  layout :layout
  before_filter :define_locale
  include ExtJS::Controller
  helper ExtJS::Helpers::Store
  helper ExtJS::Helpers::Component

  def define_locale
    if params[:locale] == nil
      I18n.locale = 'fr'
    else
      I18n.locale = params[:locale]
    end
  end

  def after_sign_in_path_for(resource)
      '/dossiers'
  end

    private

    def layout

      # or turn layout off for every devise controller:
      !devise_controller? && "application"
    end
  
  
end
