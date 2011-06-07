require 'test_helper'

class ParametresCabinetsControllerTest < ActionController::TestCase
  setup do
    @parametres_cabinet = parametres_cabinets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:parametres_cabinets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create parametres_cabinet" do
    assert_difference('ParametresCabinet.count') do
      post :create, :parametres_cabinet => @parametres_cabinet.attributes
    end

    assert_redirected_to parametres_cabinet_path(assigns(:parametres_cabinet))
  end

  test "should show parametres_cabinet" do
    get :show, :id => @parametres_cabinet.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @parametres_cabinet.to_param
    assert_response :success
  end

  test "should update parametres_cabinet" do
    put :update, :id => @parametres_cabinet.to_param, :parametres_cabinet => @parametres_cabinet.attributes
    assert_redirected_to parametres_cabinet_path(assigns(:parametres_cabinet))
  end

  test "should destroy parametres_cabinet" do
    assert_difference('ParametresCabinet.count', -1) do
      delete :destroy, :id => @parametres_cabinet.to_param
    end

    assert_redirected_to parametres_cabinets_path
  end
end
