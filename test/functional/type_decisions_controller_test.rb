require 'test_helper'

class TypeDecisionsControllerTest < ActionController::TestCase
  setup do
    @type_decision = type_decisions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_decisions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_decision" do
    assert_difference('TypeDecision.count') do
      post :create, :type_decision => @type_decision.attributes
    end

    assert_redirected_to type_decision_path(assigns(:type_decision))
  end

  test "should show type_decision" do
    get :show, :id => @type_decision.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_decision.to_param
    assert_response :success
  end

  test "should update type_decision" do
    put :update, :id => @type_decision.to_param, :type_decision => @type_decision.attributes
    assert_redirected_to type_decision_path(assigns(:type_decision))
  end

  test "should destroy type_decision" do
    assert_difference('TypeDecision.count', -1) do
      delete :destroy, :id => @type_decision.to_param
    end

    assert_redirected_to type_decisions_path
  end
end
