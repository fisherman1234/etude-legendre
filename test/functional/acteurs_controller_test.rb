require 'test_helper'

class ActeursControllerTest < ActionController::TestCase
  setup do
    @acteur = acteurs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:acteurs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create acteur" do
    assert_difference('Acteur.count') do
      post :create, :acteur => @acteur.attributes
    end

    assert_redirected_to acteur_path(assigns(:acteur))
  end

  test "should show acteur" do
    get :show, :id => @acteur.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @acteur.to_param
    assert_response :success
  end

  test "should update acteur" do
    put :update, :id => @acteur.to_param, :acteur => @acteur.attributes
    assert_redirected_to acteur_path(assigns(:acteur))
  end

  test "should destroy acteur" do
    assert_difference('Acteur.count', -1) do
      delete :destroy, :id => @acteur.to_param
    end

    assert_redirected_to acteurs_path
  end
end
