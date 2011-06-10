EtudeLegendre::Application.routes.draw do


  resources :add_contact_acteur_to_contact_to_communications

  resources :message_templates

  resources :parametres_cabinets

  resources :consignations

  resources :type_activites

  resources :activites

  resources :communications

  resources :transmission_media

  resources :contact_to_documents

  resources :documents

  resources :code_postal_villes

  resources :type_etat_dossiers

  resources :type_institutions

  resources :type_adresses

  resources :type_intervenants

  resources :qualite_procedurales

  resources :contact_acteurs

  resources :type_acteurs

  resources :acteurs

  resources :type_decisions

  resources :type_expertises

  resources :institutions

  resources :contacts

  resources :dossiers
  resources :users
  devise_for :users, :path => '', :path_names => { :sign_in => "login", :sign_out => "logout", :sign_up => "register" }

  root :to => "home#index"
  match 'dossiers/:id/acteurs', :to => 'dossiers#acteurs' , :method => :get  
  match 'dossiers/:id/new_partie', :to => 'dossiers#new_partie' , :method => :get  
  match 'contact_acteurs/:id/destroy', :to => 'contact_acteurs#destroy' , :method => :post
  match "versions/:id/revert", :to => "versions#revert",  :method => :post 
  match "current_user_signed_in", :to => "users#current_user_signed_in", :method => :get 
  match "users/destroy_current_user_session", :to => "users#destroy_current_user_session", :method => :get 
  match "users/connexion", :to => "users#connexion", :method => :get 
  match "contacts/:id/destroy", :to => "contacts#destroy", :method => :post 
  match "dossiers/:id/destroy", :to => "dossiers#destroy", :method => :post 
  match "institutions/:id/destroy", :to => "institutions#destroy", :method => :post 
  match 'dossiers/:id/documents', :to => 'dossiers#documents' , :method => :get  
  match "documents/:id/destroy", :to => "documents#destroy", :method => :post 
  match "dossiers/:id/new_communication", :to => "dossiers#new_communication", :method => :get 
  match "communications/:id/send_documents", :to => "communications#send_documents", :method => :get
  match "communications/:id/generate_attachments_docs", :to => "communications#generate_attachments_docs", :method => :get 
  match "communications/:id/review", :to => "communications#review", :method => :get
  
  
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
