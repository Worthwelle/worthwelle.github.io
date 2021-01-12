require_relative "test_helper"

class ReadabilityTest < Blog::Test
  def test_last_line_is_empty
    posts.each do |post|
      content = remove_yaml(post)

      body_text = content.split("\n")

      assert_operator body_text[-1], :>, "", "Files should end with an empty line.; File: " + post
    end
  end
end