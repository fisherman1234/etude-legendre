require 'test_helper'

class ActivitesControllerTest < ActionController::TestCase
  setup do
    @activite = activites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:activites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create activite" do
    assert_difference('Activite.count') do
      post :create, :activite => @activite.attributes
    end

    assert_redirected_to activite_path(assigns(:activite))
  end

  test "should show activite" do
    get :show, :id => @activite.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @activite.to_param
    assert_response :success
  end

  test "should update activite" do
    put :update, :id => @activite.to_param, :activite => @activite.attributes
    assert_redirected_to activite_path(assigns(:activite))
  end

  test "should destroy activite" do
    assert_difference('Activite.count', -1) do
      delete :destroy, :id => @activite.to_param
    end

    assert_redirected_to activites_path
  end
end
