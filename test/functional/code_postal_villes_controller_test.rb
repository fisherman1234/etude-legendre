require 'test_helper'

class CodePostalVillesControllerTest < ActionController::TestCase
  setup do
    @code_postal_ville = code_postal_villes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:code_postal_villes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create code_postal_ville" do
    assert_difference('CodePostalVille.count') do
      post :create, :code_postal_ville => @code_postal_ville.attributes
    end

    assert_redirected_to code_postal_ville_path(assigns(:code_postal_ville))
  end

  test "should show code_postal_ville" do
    get :show, :id => @code_postal_ville.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @code_postal_ville.to_param
    assert_response :success
  end

  test "should update code_postal_ville" do
    put :update, :id => @code_postal_ville.to_param, :code_postal_ville => @code_postal_ville.attributes
    assert_redirected_to code_postal_ville_path(assigns(:code_postal_ville))
  end

  test "should destroy code_postal_ville" do
    assert_difference('CodePostalVille.count', -1) do
      delete :destroy, :id => @code_postal_ville.to_param
    end

    assert_redirected_to code_postal_villes_path
  end
end
