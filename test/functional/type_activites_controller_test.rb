require 'test_helper'

class TypeActivitesControllerTest < ActionController::TestCase
  setup do
    @type_activite = type_activites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_activites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_activite" do
    assert_difference('TypeActivite.count') do
      post :create, :type_activite => @type_activite.attributes
    end

    assert_redirected_to type_activite_path(assigns(:type_activite))
  end

  test "should show type_activite" do
    get :show, :id => @type_activite.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_activite.to_param
    assert_response :success
  end

  test "should update type_activite" do
    put :update, :id => @type_activite.to_param, :type_activite => @type_activite.attributes
    assert_redirected_to type_activite_path(assigns(:type_activite))
  end

  test "should destroy type_activite" do
    assert_difference('TypeActivite.count', -1) do
      delete :destroy, :id => @type_activite.to_param
    end

    assert_redirected_to type_activites_path
  end
end
