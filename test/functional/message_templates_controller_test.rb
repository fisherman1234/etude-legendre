require 'test_helper'

class MessageTemplatesControllerTest < ActionController::TestCase
  setup do
    @message_template = message_templates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:message_templates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create message_template" do
    assert_difference('MessageTemplate.count') do
      post :create, :message_template => @message_template.attributes
    end

    assert_redirected_to message_template_path(assigns(:message_template))
  end

  test "should show message_template" do
    get :show, :id => @message_template.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @message_template.to_param
    assert_response :success
  end

  test "should update message_template" do
    put :update, :id => @message_template.to_param, :message_template => @message_template.attributes
    assert_redirected_to message_template_path(assigns(:message_template))
  end

  test "should destroy message_template" do
    assert_difference('MessageTemplate.count', -1) do
      delete :destroy, :id => @message_template.to_param
    end

    assert_redirected_to message_templates_path
  end
end
