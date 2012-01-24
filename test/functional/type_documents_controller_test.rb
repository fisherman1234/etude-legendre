require 'test_helper'

class TypeDocumentsControllerTest < ActionController::TestCase
  setup do
    @type_document = type_documents(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:type_documents)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create type_document" do
    assert_difference('TypeDocument.count') do
      post :create, :type_document => @type_document.attributes
    end

    assert_redirected_to type_document_path(assigns(:type_document))
  end

  test "should show type_document" do
    get :show, :id => @type_document.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @type_document.to_param
    assert_response :success
  end

  test "should update type_document" do
    put :update, :id => @type_document.to_param, :type_document => @type_document.attributes
    assert_redirected_to type_document_path(assigns(:type_document))
  end

  test "should destroy type_document" do
    assert_difference('TypeDocument.count', -1) do
      delete :destroy, :id => @type_document.to_param
    end

    assert_redirected_to type_documents_path
  end
end
