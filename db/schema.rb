# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111119155928) do

  create_table "acteurs", :force => true do |t|
    t.integer  "type_acteur_id"
    t.integer  "dossier_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
  end

  create_table "activite_to_documents", :force => true do |t|
    t.integer  "document_id"
    t.integer  "activite_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "included_in_activite"
  end

  create_table "activites", :force => true do |t|
    t.integer  "type_activite_id"
    t.string   "description"
    t.integer  "no_accedit"
    t.string   "adresse1"
    t.string   "adresse2"
    t.string   "adresse3"
    t.string   "code_postal"
    t.string   "ville"
    t.string   "pays"
    t.string   "heure"
    t.text     "commentaires"
    t.integer  "is_confidentiel"
    t.date     "terme_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "dossier_id"
    t.integer  "message_template_id"
    t.integer  "add_to_gcal"
    t.datetime "date_visite"
  end

  create_table "categories", :force => true do |t|
    t.string   "description"
    t.integer  "taux_tva_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "civilites", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "code_postal_villes", :force => true do |t|
    t.string   "ville"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "code_postal"
  end

  add_index "code_postal_villes", ["code_postal"], :name => "index_code_postal_villes_on_code_postal"
  add_index "code_postal_villes", ["ville"], :name => "index_code_postal_villes_on_ville"

  create_table "communications", :force => true do |t|
    t.integer  "sender_id"
    t.integer  "dossier_id"
    t.string   "subject_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "activite_id"
    t.integer  "message_template_id"
    t.text     "letter_body"
    t.integer  "is_doc_generated"
    t.integer  "is_sent"
    t.integer  "inbound",             :default => 0
  end

  create_table "consignation_lines", :force => true do |t|
    t.integer  "contact_id"
    t.integer  "institution_id"
    t.float    "montant"
    t.date     "date_consignation"
    t.date     "terme_consignation"
    t.integer  "type_status_consignation_id"
    t.integer  "consignation_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "consignations", :force => true do |t|
    t.integer  "activite_id"
    t.integer  "is_private"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "dossier_id"
    t.integer  "user_id"
    t.integer  "contact_id"
    t.string   "description"
  end

  create_table "contact_acteurs", :force => true do |t|
    t.integer  "qualite_procedurale_id"
    t.integer  "contact_id"
    t.integer  "acteur_id"
    t.integer  "institution_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "references"
    t.text     "notes"
    t.float    "montant_devis"
    t.string   "role_in_procedure"
  end

  create_table "contact_to_communications", :force => true do |t|
    t.integer  "contact_id"
    t.integer  "communication_id"
    t.integer  "transmission_medium_id"
    t.string   "recipient"
    t.string   "adresse1"
    t.string   "adresse2"
    t.string   "adresse3"
    t.string   "code_postal"
    t.string   "pays"
    t.string   "telephone"
    t.string   "email"
    t.string   "fax"
    t.integer  "doc_sent"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "communication_template_id"
    t.string   "genre_lettre"
    t.string   "genre_adresse"
    t.string   "references_courrier"
    t.string   "ville"
    t.string   "final_file_file_name"
    t.string   "final_file_content_type"
    t.integer  "final_file_file_size"
    t.datetime "final_file_updated_at"
    t.integer  "contact_acteur_id"
    t.string   "partie"
  end

  create_table "contacts", :force => true do |t|
    t.string   "nom"
    t.string   "prenom"
    t.integer  "civilite"
    t.string   "adresse1"
    t.string   "adresse2"
    t.string   "adresse3"
    t.string   "code_postal"
    t.string   "ville"
    t.string   "pays"
    t.string   "telephone"
    t.string   "fax"
    t.string   "portable"
    t.string   "email"
    t.string   "site_web"
    t.integer  "institution_id"
    t.string   "genre_adresse"
    t.string   "genre_lettre"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "type_intervenant_id"
    t.string   "avocat_au_barreau"
    t.text     "notes"
    t.integer  "contact_medium_id"
    t.integer  "user_id"
    t.integer  "parametres_cabinet_id"
  end

  create_table "document_to_communications", :force => true do |t|
    t.integer  "document_id"
    t.integer  "communication_id"
    t.integer  "included_in_communication"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "documents", :force => true do |t|
    t.string   "description"
    t.integer  "dossier_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.integer  "contact_id"
  end

  create_table "dossiers", :force => true do |t|
    t.string   "ref_cabinet"
    t.string   "nom_dossier"
    t.date     "date_decision"
    t.date     "date_avis_designation"
    t.date     "date_cible_depot_rapport"
    t.date     "date_effective_depot_raport"
    t.string   "numero_service_expertise"
    t.string   "numero_role_general"
    t.integer  "type_expertise_id"
    t.integer  "type_decision_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "institution_id"
    t.date     "date_debut_op_theorique"
    t.date     "date_debut_op_reelle"
    t.integer  "type_etat_dossier_id"
    t.integer  "user_id"
    t.integer  "parametres_cabinet_id"
    t.string   "recap_frais_file_name"
    t.string   "recap_frais_content_type"
    t.integer  "recap_frais_file_size"
    t.datetime "recap_frais_updated_at"
  end

  create_table "drop_type_adresses", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "expenses", :force => true do |t|
    t.integer  "consignation_id"
    t.integer  "item_id"
    t.string   "description"
    t.float    "prix_unitaire"
    t.float    "quantite"
    t.date     "date_item"
    t.integer  "taux_tva_id"
    t.integer  "unite_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "dossier_id"
    t.integer  "user_id"
    t.integer  "activite_id"
    t.integer  "categorie_id"
  end

  create_table "institutions", :force => true do |t|
    t.string   "nom"
    t.string   "chambre"
    t.string   "telephone"
    t.string   "fax"
    t.string   "site_web"
    t.string   "commentaires"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "type_institution_id"
    t.integer  "parametres_cabinet_id"
  end

  create_table "items", :force => true do |t|
    t.string   "description"
    t.integer  "categorie_id"
    t.float    "prix_unitaire"
    t.integer  "taux_tva_id"
    t.integer  "unite_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "ligne_consignation_items", :force => true do |t|
    t.integer  "consignation_id"
    t.integer  "item_id"
    t.string   "description"
    t.float    "prix_unitaire"
    t.float    "quantite"
    t.date     "date_item"
    t.integer  "taux_tva_id"
    t.integer  "unite_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "dossier_id"
    t.integer  "user_id"
  end

  create_table "message_templates", :force => true do |t|
    t.text     "message_body"
    t.text     "type_acteurs"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "mail_subject"
    t.text     "letter_body"
    t.string   "description"
    t.integer  "parametres_cabinet_id"
  end

  create_table "message_templates_type_acteurs", :id => false, :force => true do |t|
    t.integer "type_acteur_id"
    t.integer "message_template_id"
  end

  create_table "netzke_temp_table", :force => true do |t|
  end

  create_table "parametres_cabinets", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nom_cabinet"
    t.string   "adresse1"
    t.string   "adresse2"
    t.string   "adresse3"
    t.string   "code_postal"
    t.string   "ville"
    t.string   "pays"
    t.string   "telephone"
    t.string   "fax"
    t.string   "email"
    t.string   "site_internet"
    t.text     "en_tete_lettres"
    t.text     "pied_page_lettres"
    t.text     "marge_gauche_lettres"
    t.string   "siret"
    t.string   "naf"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.datetime "logo_updated_at"
    t.integer  "en_tete_marge_haut"
    t.integer  "en_tete_marge_gauche"
    t.integer  "en_tete_marge_droite"
    t.integer  "en_tete_marge_bas"
    t.string   "papier_en_tete_file_name"
    t.string   "papier_en_tete_content_type"
    t.integer  "papier_en_tete_file_size"
    t.datetime "papier_en_tete_updated_at"
  end

  create_table "qualite_procedurales", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "reminders", :force => true do |t|
    t.date     "reminder_date"
    t.string   "description"
    t.integer  "activite_id"
    t.integer  "user_id"
    t.integer  "dossier_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "status_consignations", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "taux_tvas", :force => true do |t|
    t.string   "description"
    t.float    "taux"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "transmission_media", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_acteurs", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "type_activites", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
    t.integer  "categorie_id"
    t.integer  "message_template_id"
  end

  create_table "type_adresses", :force => true do |t|
    t.string   "description_adresse"
    t.string   "description_courrier"
    t.integer  "type_intervenant_id"
    t.integer  "civilite_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "type_decisions", :force => true do |t|
    t.string   "description"
    t.text     "commentaires"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "type_etat_dossiers", :force => true do |t|
    t.string   "description"
    t.integer  "ordre_apparition"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "type_expertises", :force => true do |t|
    t.string   "description"
    t.text     "commentaires"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "type_institutions", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "type_intervenants", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "type_status_consignations", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "unites", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parametres_cabinet_id"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                               :null => false
    t.string   "encrypted_password",    :limit => 128,                :null => false
    t.string   "password_salt",                                       :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nom"
    t.string   "civilite"
    t.string   "prenom"
    t.string   "titre_lettres"
    t.string   "fonction"
    t.string   "adresse1"
    t.string   "adresse2"
    t.string   "adresse3"
    t.string   "code_postal"
    t.string   "ville"
    t.string   "pays"
    t.string   "telephone"
    t.string   "fax"
    t.text     "signature_lettres"
    t.string   "genre_adresse"
    t.string   "genre_lettre"
    t.string   "site_web"
    t.integer  "parametres_cabinet_id"
    t.integer  "contact_id"
    t.integer  "type_intervenant_id"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "versions", :force => true do |t|
    t.string   "item_type",  :null => false
    t.integer  "item_id",    :null => false
    t.string   "event",      :null => false
    t.string   "whodunnit"
    t.text     "object"
    t.datetime "created_at"
  end

  add_index "versions", ["item_type", "item_id"], :name => "index_versions_on_item_type_and_item_id"

end
