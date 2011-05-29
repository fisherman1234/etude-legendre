require 'test_helper'

class TypeInstitutionsControllerTest < ActionController::TestCase
  setup do
    @type_institution = type_institutions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_institutions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_institution" do
    assert_difference('TypeInstitution.count') do
      post :create, :type_institution => @type_institution.attributes
    end

    assert_redirected_to type_institution_path(assigns(:type_institution))
  end

  test "should show type_institution" do
    get :show, :id => @type_institution.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_institution.to_param
    assert_response :success
  end

  test "should update type_institution" do
    put :update, :id => @type_institution.to_param, :type_institution => @type_institution.attributes
    assert_redirected_to type_institution_path(assigns(:type_institution))
  end

  test "should destroy type_institution" do
    assert_difference('TypeInstitution.count', -1) do
      delete :destroy, :id => @type_institution.to_param
    end

    assert_redirected_to type_institutions_path
  end
end
