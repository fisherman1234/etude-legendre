require 'test_helper'

class CommunicationsControllerTest < ActionController::TestCase
  setup do
    @communication = communications(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:communications)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create communication" do
    assert_difference('Communication.count') do
      post :create, :communication => @communication.attributes
    end

    assert_redirected_to communication_path(assigns(:communication))
  end

  test "should show communication" do
    get :show, :id => @communication.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @communication.to_param
    assert_response :success
  end

  test "should update communication" do
    put :update, :id => @communication.to_param, :communication => @communication.attributes
    assert_redirected_to communication_path(assigns(:communication))
  end

  test "should destroy communication" do
    assert_difference('Communication.count', -1) do
      delete :destroy, :id => @communication.to_param
    end

    assert_redirected_to communications_path
  end
end
