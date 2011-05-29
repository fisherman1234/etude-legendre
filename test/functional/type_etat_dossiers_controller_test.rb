require 'test_helper'

class TypeEtatDossiersControllerTest < ActionController::TestCase
  setup do
    @type_etat_dossier = type_etat_dossiers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_etat_dossiers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_etat_dossier" do
    assert_difference('TypeEtatDossier.count') do
      post :create, :type_etat_dossier => @type_etat_dossier.attributes
    end

    assert_redirected_to type_etat_dossier_path(assigns(:type_etat_dossier))
  end

  test "should show type_etat_dossier" do
    get :show, :id => @type_etat_dossier.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_etat_dossier.to_param
    assert_response :success
  end

  test "should update type_etat_dossier" do
    put :update, :id => @type_etat_dossier.to_param, :type_etat_dossier => @type_etat_dossier.attributes
    assert_redirected_to type_etat_dossier_path(assigns(:type_etat_dossier))
  end

  test "should destroy type_etat_dossier" do
    assert_difference('TypeEtatDossier.count', -1) do
      delete :destroy, :id => @type_etat_dossier.to_param
    end

    assert_redirected_to type_etat_dossiers_path
  end
end
