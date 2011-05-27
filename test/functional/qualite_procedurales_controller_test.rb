require 'test_helper'

class QualiteProceduralesControllerTest < ActionController::TestCase
  setup do
    @qualite_procedurale = qualite_procedurales(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:qualite_procedurales)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create qualite_procedurale" do
    assert_difference('QualiteProcedurale.count') do
      post :create, :qualite_procedurale => @qualite_procedurale.attributes
    end

    assert_redirected_to qualite_procedurale_path(assigns(:qualite_procedurale))
  end

  test "should show qualite_procedurale" do
    get :show, :id => @qualite_procedurale.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @qualite_procedurale.to_param
    assert_response :success
  end

  test "should update qualite_procedurale" do
    put :update, :id => @qualite_procedurale.to_param, :qualite_procedurale => @qualite_procedurale.attributes
    assert_redirected_to qualite_procedurale_path(assigns(:qualite_procedurale))
  end

  test "should destroy qualite_procedurale" do
    assert_difference('QualiteProcedurale.count', -1) do
      delete :destroy, :id => @qualite_procedurale.to_param
    end

    assert_redirected_to qualite_procedurales_path
  end
end
