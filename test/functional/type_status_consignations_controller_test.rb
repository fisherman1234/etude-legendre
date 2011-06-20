require 'test_helper'

class TypeStatusConsignationsControllerTest < ActionController::TestCase
  setup do
    @type_status_consignation = type_status_consignations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_status_consignations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_status_consignation" do
    assert_difference('TypeStatusConsignation.count') do
      post :create, :type_status_consignation => @type_status_consignation.attributes
    end

    assert_redirected_to type_status_consignation_path(assigns(:type_status_consignation))
  end

  test "should show type_status_consignation" do
    get :show, :id => @type_status_consignation.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_status_consignation.to_param
    assert_response :success
  end

  test "should update type_status_consignation" do
    put :update, :id => @type_status_consignation.to_param, :type_status_consignation => @type_status_consignation.attributes
    assert_redirected_to type_status_consignation_path(assigns(:type_status_consignation))
  end

  test "should destroy type_status_consignation" do
    assert_difference('TypeStatusConsignation.count', -1) do
      delete :destroy, :id => @type_status_consignation.to_param
    end

    assert_redirected_to type_status_consignations_path
  end
end
