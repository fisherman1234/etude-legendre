require 'test_helper'

class TypeExpertisesControllerTest < ActionController::TestCase
  setup do
    @type_expertise = type_expertises(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_expertises)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_expertise" do
    assert_difference('TypeExpertise.count') do
      post :create, :type_expertise => @type_expertise.attributes
    end

    assert_redirected_to type_expertise_path(assigns(:type_expertise))
  end

  test "should show type_expertise" do
    get :show, :id => @type_expertise.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_expertise.to_param
    assert_response :success
  end

  test "should update type_expertise" do
    put :update, :id => @type_expertise.to_param, :type_expertise => @type_expertise.attributes
    assert_redirected_to type_expertise_path(assigns(:type_expertise))
  end

  test "should destroy type_expertise" do
    assert_difference('TypeExpertise.count', -1) do
      delete :destroy, :id => @type_expertise.to_param
    end

    assert_redirected_to type_expertises_path
  end
end
