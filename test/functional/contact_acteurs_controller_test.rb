require 'test_helper'

class ContactActeursControllerTest < ActionController::TestCase
  setup do
    @contact_acteur = contact_acteurs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:contact_acteurs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create contact_acteur" do
    assert_difference('ContactActeur.count') do
      post :create, :contact_acteur => @contact_acteur.attributes
    end

    assert_redirected_to contact_acteur_path(assigns(:contact_acteur))
  end

  test "should show contact_acteur" do
    get :show, :id => @contact_acteur.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @contact_acteur.to_param
    assert_response :success
  end

  test "should update contact_acteur" do
    put :update, :id => @contact_acteur.to_param, :contact_acteur => @contact_acteur.attributes
    assert_redirected_to contact_acteur_path(assigns(:contact_acteur))
  end

  test "should destroy contact_acteur" do
    assert_difference('ContactActeur.count', -1) do
      delete :destroy, :id => @contact_acteur.to_param
    end

    assert_redirected_to contact_acteurs_path
  end
end
