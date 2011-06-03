require 'test_helper'

class ConsignationsControllerTest < ActionController::TestCase
  setup do
    @consignation = consignations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:consignations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create consignation" do
    assert_difference('Consignation.count') do
      post :create, :consignation => @consignation.attributes
    end

    assert_redirected_to consignation_path(assigns(:consignation))
  end

  test "should show consignation" do
    get :show, :id => @consignation.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @consignation.to_param
    assert_response :success
  end

  test "should update consignation" do
    put :update, :id => @consignation.to_param, :consignation => @consignation.attributes
    assert_redirected_to consignation_path(assigns(:consignation))
  end

  test "should destroy consignation" do
    assert_difference('Consignation.count', -1) do
      delete :destroy, :id => @consignation.to_param
    end

    assert_redirected_to consignations_path
  end
end
