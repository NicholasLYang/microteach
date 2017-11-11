require 'test_helper'

class TutorialsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tutorial = tutorials(:one)
  end

  test "should get index" do
    get tutorials_url, as: :json
    assert_response :success
  end

  test "should create tutorial" do
    assert_difference('Tutorial.count') do
      post tutorials_url, params: { tutorial: { author: @tutorial.author, name: @tutorial.name } }, as: :json
    end

    assert_response 201
  end

  test "should show tutorial" do
    get tutorial_url(@tutorial), as: :json
    assert_response :success
  end

  test "should update tutorial" do
    patch tutorial_url(@tutorial), params: { tutorial: { author: @tutorial.author, name: @tutorial.name } }, as: :json
    assert_response 200
  end

  test "should destroy tutorial" do
    assert_difference('Tutorial.count', -1) do
      delete tutorial_url(@tutorial), as: :json
    end

    assert_response 204
  end
end
