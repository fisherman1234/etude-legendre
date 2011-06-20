require 'test_helper'

class StatusConsignationsControllerTest < ActionController::TestCase
  setup do
    @status_consignation = status_consignations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:status_consignations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create status_consignation" do
    assert_difference('StatusConsignation.count') do
      post :create, :status_consignation => @status_consignation.attributes
    end

    assert_redirected_to status_consignation_path(assigns(:status_consignation))
  end

  test "should show status_consignation" do
    get :show, :id => @status_consignation.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @status_consignation.to_param
    assert_response :success
  end

  test "should update status_consignation" do
    put :update, :id => @status_consignation.to_param, :status_consignation => @status_consignation.attributes
    assert_redirected_to status_consignation_path(assigns(:status_consignation))
  end

  test "should destroy status_consignation" do
    assert_difference('StatusConsignation.count', -1) do
      delete :destroy, :id => @status_consignation.to_param
    end

    assert_redirected_to status_consignations_path
  end
end
