require 'test_helper'

class TypeFormuleAdressesControllerTest < ActionController::TestCase
  setup do
    @type_formule_adress = type_formule_adresses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_formule_adresses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_formule_adress" do
    assert_difference('TypeFormuleAdresse.count') do
      post :create, :type_formule_adress => @type_formule_adress.attributes
    end

    assert_redirected_to type_formule_adress_path(assigns(:type_formule_adress))
  end

  test "should show type_formule_adress" do
    get :show, :id => @type_formule_adress.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_formule_adress.to_param
    assert_response :success
  end

  test "should update type_formule_adress" do
    put :update, :id => @type_formule_adress.to_param, :type_formule_adress => @type_formule_adress.attributes
    assert_redirected_to type_formule_adress_path(assigns(:type_formule_adress))
  end

  test "should destroy type_formule_adress" do
    assert_difference('TypeFormuleAdresse.count', -1) do
      delete :destroy, :id => @type_formule_adress.to_param
    end

    assert_redirected_to type_formule_adresses_path
  end
end
