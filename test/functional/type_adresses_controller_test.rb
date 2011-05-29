require 'test_helper'

class TypeAdressesControllerTest < ActionController::TestCase
  setup do
    @type_adress = type_adresses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_adresses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_adress" do
    assert_difference('TypeAdresse.count') do
      post :create, :type_adress => @type_adress.attributes
    end

    assert_redirected_to type_adress_path(assigns(:type_adress))
  end

  test "should show type_adress" do
    get :show, :id => @type_adress.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_adress.to_param
    assert_response :success
  end

  test "should update type_adress" do
    put :update, :id => @type_adress.to_param, :type_adress => @type_adress.attributes
    assert_redirected_to type_adress_path(assigns(:type_adress))
  end

  test "should destroy type_adress" do
    assert_difference('TypeAdresse.count', -1) do
      delete :destroy, :id => @type_adress.to_param
    end

    assert_redirected_to type_adresses_path
  end
end
