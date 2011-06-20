require 'test_helper'

class ConsignationLinesControllerTest < ActionController::TestCase
  setup do
    @consignation_line = consignation_lines(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:consignation_lines)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create consignation_line" do
    assert_difference('ConsignationLine.count') do
      post :create, :consignation_line => @consignation_line.attributes
    end

    assert_redirected_to consignation_line_path(assigns(:consignation_line))
  end

  test "should show consignation_line" do
    get :show, :id => @consignation_line.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @consignation_line.to_param
    assert_response :success
  end

  test "should update consignation_line" do
    put :update, :id => @consignation_line.to_param, :consignation_line => @consignation_line.attributes
    assert_redirected_to consignation_line_path(assigns(:consignation_line))
  end

  test "should destroy consignation_line" do
    assert_difference('ConsignationLine.count', -1) do
      delete :destroy, :id => @consignation_line.to_param
    end

    assert_redirected_to consignation_lines_path
  end
end
