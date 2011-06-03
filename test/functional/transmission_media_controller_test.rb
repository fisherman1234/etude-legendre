require 'test_helper'

class TransmissionMediaControllerTest < ActionController::TestCase
  setup do
    @transmission_medium = transmission_media(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:transmission_media)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create transmission_medium" do
    assert_difference('TransmissionMedium.count') do
      post :create, :transmission_medium => @transmission_medium.attributes
    end

    assert_redirected_to transmission_medium_path(assigns(:transmission_medium))
  end

  test "should show transmission_medium" do
    get :show, :id => @transmission_medium.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @transmission_medium.to_param
    assert_response :success
  end

  test "should update transmission_medium" do
    put :update, :id => @transmission_medium.to_param, :transmission_medium => @transmission_medium.attributes
    assert_redirected_to transmission_medium_path(assigns(:transmission_medium))
  end

  test "should destroy transmission_medium" do
    assert_difference('TransmissionMedium.count', -1) do
      delete :destroy, :id => @transmission_medium.to_param
    end

    assert_redirected_to transmission_medias_path
  end
end
