EtudeLegendre::Application.routes.draw do

  resources :type_documents

  resources :type_civilites_correspondances

  resources :civilite_correspondances

  resources :reminders

  resources :civilites
  resources :contact_to_communications
  resources :institutions do
    get :autocomplete_institutions_nom, :on => :collection
  end

  
  match 'components/:component' => 'components#index', :as => "components"
  
  resources :type_status_consignations

  resources :consignation_lines

  resources :expenses

  resources :frais

  resources :status_consignations

  resources :unites

  resources :categories

  resources :items

  resources :taux_tvas


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

  root :to => "users#show"
  match 'dossiers/:id/acteurs', :to => 'dossiers#acteurs' , :method => :get  
  match 'dossiers/:id/new_partie', :to => 'dossiers#new_partie' , :method => :get  
  match 'contact_acteurs/:id/destroy', :to => 'contact_acteurs#destroy' , :method => :post
  match "versions/:id/revert", :to => "versions#revert",  :method => :post 
  match "current_user_signed_in", :to => "users#current_user_signed_in", :method => :get 
  match "users/destroy_current_user_session", :to => "users#destroy_current_user_session", :method => :get 
  match "users/:id/destroy", :to => "users#destroy"
  match "parametres_cabinets/:id/destroy", :to => "parametres_cabinets#destroy"

  match "users/:id/remove_password", :to => "users#remove_password"
  
  match "users/connexion", :to => "users#connexion", :method => :get 
  match "contacts/:id/destroy", :to => "contacts#destroy", :method => :post 
  match "activites/:id/destroy", :to => "activites#destroy", :method => :post 
  match "documents/:id", :to => "documents#update", :method => :post 

  match "dossiers/:id/destroy", :to => "dossiers#destroy", :method => :post 
  match "institutions/:id/destroy", :to => "institutions#destroy", :method => :post 
  match 'dossiers/:id/documents', :to => 'dossiers#documents' , :method => :get  
  match "documents/:id/destroy", :to => "documents#destroy", :method => :post 
  match "dossiers/:id/new_communication", :to => "dossiers#new_communication", :method => :get 
  match "communications/:id/send_documents", :to => "communications#send_documents", :method => :get
  match "communications/:id/generate_attachments_docs", :to => "communications#generate_attachments_docs", :method => :get 
  match "communications/:id/review", :to => "communications#review", :method => :get
  match 'dossiers/:id/activites', :to => 'dossiers#activites' , :method => :get  
  match 'dossiers/:id/frais', :to => 'dossiers#frais' , :method => :get  
  match 'dossiers/:id/recap_frais', :to => 'dossiers#recap_frais' , :method => :get  
  match 'dossiers/:id/recap_frais_full', :to => 'dossiers#recap_frais_full' , :method => :get  
  match 'dossiers/:id/encours_frais', :to => 'dossiers#encours_frais' , :method => :get  
  match 'getactortree', :to => 'acteurs#getActorTree'

  match 'dossiers/:id/consignations', :to => 'dossiers#consignations' , :method => :get  
  match 'consignations/:id/destroy', :to => 'consignations#destroy' , :method => :post  
  match 'message_templates/:id/destroy', :to => 'message_templates#destroy' , :method => :get  
  
  match 'message_templates/:id/mark_as_global', :to => 'message_templates#mark_as_global'
  
  match "expenses/:id/destroy", :to => "expenses#destroy", :method => :post 
  match "activites/:id/expenses", :to => "activites#expenses", :method => :get 
  
  match "to_pdf", :to => "application#to_pdf", :method => :post 
  match "export/contacts", :to => "export#partieList"
  match "export/documents", :to => "export#documents"
  match "export/expenses", :to => "export#expenses"
  match "export/quote", :to => "export#quote"
  match "export/convocations", :to => "export#convocations"
  match "export/list_pieces", :to => "export#list_pieces"
  match "export/cabinet", :to => "export#export_cabinet"

  #match "appli/model/:model", :to => "sencha#model"
  #match "appli/store/:plural_model", :to => "sencha#store"

  
  resources :my_user
  
  
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

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
