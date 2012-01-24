require 'test_helper'

class CiviliteCorrespondancesControllerTest < ActionController::TestCase
  setup do
    @civilite_correspondance = civilite_correspondances(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:civilite_correspondances)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create civilite_correspondance" do
    assert_difference('CiviliteCorrespondance.count') do
      post :create, :civilite_correspondance => @civilite_correspondance.attributes
    end

    assert_redirected_to civilite_correspondance_path(assigns(:civilite_correspondance))
  end

  test "should show civilite_correspondance" do
    get :show, :id => @civilite_correspondance.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @civilite_correspondance.to_param
    assert_response :success
  end

  test "should update civilite_correspondance" do
    put :update, :id => @civilite_correspondance.to_param, :civilite_correspondance => @civilite_correspondance.attributes
    assert_redirected_to civilite_correspondance_path(assigns(:civilite_correspondance))
  end

  test "should destroy civilite_correspondance" do
    assert_difference('CiviliteCorrespondance.count', -1) do
      delete :destroy, :id => @civilite_correspondance.to_param
    end

    assert_redirected_to civilite_correspondances_path
  end
end
