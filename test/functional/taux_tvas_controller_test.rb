require 'test_helper'

class TauxTvasControllerTest < ActionController::TestCase
  setup do
    @taux_tva = taux_tvas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:taux_tvas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create taux_tva" do
    assert_difference('TauxTva.count') do
      post :create, :taux_tva => @taux_tva.attributes
    end

    assert_redirected_to taux_tva_path(assigns(:taux_tva))
  end

  test "should show taux_tva" do
    get :show, :id => @taux_tva.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @taux_tva.to_param
    assert_response :success
  end

  test "should update taux_tva" do
    put :update, :id => @taux_tva.to_param, :taux_tva => @taux_tva.attributes
    assert_redirected_to taux_tva_path(assigns(:taux_tva))
  end

  test "should destroy taux_tva" do
    assert_difference('TauxTva.count', -1) do
      delete :destroy, :id => @taux_tva.to_param
    end

    assert_redirected_to taux_tvas_path
  end
end
