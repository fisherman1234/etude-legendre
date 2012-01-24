require 'test_helper'

class TypeCivilitesCorrespondancesControllerTest < ActionController::TestCase
  setup do
    @type_civilites_correspondance = type_civilites_correspondances(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_civilites_correspondances)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_civilites_correspondance" do
    assert_difference('TypeCivilitesCorrespondance.count') do
      post :create, :type_civilites_correspondance => @type_civilites_correspondance.attributes
    end

    assert_redirected_to type_civilites_correspondance_path(assigns(:type_civilites_correspondance))
  end

  test "should show type_civilites_correspondance" do
    get :show, :id => @type_civilites_correspondance.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_civilites_correspondance.to_param
    assert_response :success
  end

  test "should update type_civilites_correspondance" do
    put :update, :id => @type_civilites_correspondance.to_param, :type_civilites_correspondance => @type_civilites_correspondance.attributes
    assert_redirected_to type_civilites_correspondance_path(assigns(:type_civilites_correspondance))
  end

  test "should destroy type_civilites_correspondance" do
    assert_difference('TypeCivilitesCorrespondance.count', -1) do
      delete :destroy, :id => @type_civilites_correspondance.to_param
    end

    assert_redirected_to type_civilites_correspondances_path
  end
end
