require 'test_helper'

class TypeIntervenantsControllerTest < ActionController::TestCase
  setup do
    @type_intervenant = type_intervenants(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_intervenants)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_intervenant" do
    assert_difference('TypeIntervenant.count') do
      post :create, :type_intervenant => @type_intervenant.attributes
    end

    assert_redirected_to type_intervenant_path(assigns(:type_intervenant))
  end

  test "should show type_intervenant" do
    get :show, :id => @type_intervenant.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_intervenant.to_param
    assert_response :success
  end

  test "should update type_intervenant" do
    put :update, :id => @type_intervenant.to_param, :type_intervenant => @type_intervenant.attributes
    assert_redirected_to type_intervenant_path(assigns(:type_intervenant))
  end

  test "should destroy type_intervenant" do
    assert_difference('TypeIntervenant.count', -1) do
      delete :destroy, :id => @type_intervenant.to_param
    end

    assert_redirected_to type_intervenants_path
  end
end
