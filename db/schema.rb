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

ActiveRecord::Schema.define(:version => 20110529144457) do

  create_table "acteurs", :force => true do |t|
    t.integer  "type_acteur_id"
    t.integer  "dossier_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
  end

  create_table "contact_acteurs", :force => true do |t|
    t.integer  "qualite_procedurale_id"
    t.integer  "contact_id"
    t.integer  "acteur_id"
    t.integer  "institution_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", :force => true do |t|
    t.string   "nom"
    t.string   "prenom"
    t.string   "civilite"
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
    t.string   "institution_id"
    t.string   "genre_adresse"
    t.string   "genre_lettre"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "type_intervenant_id"
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
  end

  create_table "drop_type_adresses", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
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
  end

  create_table "qualite_procedurales", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_acteurs", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_adresses", :force => true do |t|
    t.string   "description_adresse"
    t.string   "description_courrier"
    t.integer  "type_intervenant_id"
    t.integer  "civilite_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_decisions", :force => true do |t|
    t.string   "description"
    t.text     "commentaires"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_etat_dossiers", :force => true do |t|
    t.string   "description"
    t.integer  "ordre_apparition"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_expertises", :force => true do |t|
    t.string   "description"
    t.text     "commentaires"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_institutions", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "type_intervenants", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                               :default => "", :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "", :null => false
    t.string   "password_salt",                       :default => "", :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
