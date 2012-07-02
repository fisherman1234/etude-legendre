class SenchaController < ApplicationController
  def model
    @model = params[:model].constantize   
    respond_to do |format|
      format.js
    end
  end
  
  def store
    @model = params[:plural_model].singularize.constantize
    respond_to do |format|
      format.js
    end
  end
end
