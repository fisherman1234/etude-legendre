require 'test_helper'

class TypeActeursControllerTest < ActionController::TestCase
  setup do
    @type_acteur = type_acteurs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_acteurs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_acteur" do
    assert_difference('TypeActeur.count') do
      post :create, :type_acteur => @type_acteur.attributes
    end

    assert_redirected_to type_acteur_path(assigns(:type_acteur))
  end

  test "should show type_acteur" do
    get :show, :id => @type_acteur.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_acteur.to_param
    assert_response :success
  end

  test "should update type_acteur" do
    put :update, :id => @type_acteur.to_param, :type_acteur => @type_acteur.attributes
    assert_redirected_to type_acteur_path(assigns(:type_acteur))
  end

  test "should destroy type_acteur" do
    assert_difference('TypeActeur.count', -1) do
      delete :destroy, :id => @type_acteur.to_param
    end

    assert_redirected_to type_acteurs_path
  end
end
