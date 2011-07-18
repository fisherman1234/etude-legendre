require 'test_helper'

class CivilitesControllerTest < ActionController::TestCase
  setup do
    @civilite = civilites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:civilites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create civilite" do
    assert_difference('Civilite.count') do
      post :create, :civilite => @civilite.attributes
    end

    assert_redirected_to civilite_path(assigns(:civilite))
  end

  test "should show civilite" do
    get :show, :id => @civilite.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @civilite.to_param
    assert_response :success
  end

  test "should update civilite" do
    put :update, :id => @civilite.to_param, :civilite => @civilite.attributes
    assert_redirected_to civilite_path(assigns(:civilite))
  end

  test "should destroy civilite" do
    assert_difference('Civilite.count', -1) do
      delete :destroy, :id => @civilite.to_param
    end

    assert_redirected_to civilites_path
  end
end
