require_relative "test_helper"

class TodayTest < Blog::Test
  def test_doesnt_start_with_today
    posts.each do |post|
      content = remove_yaml(post)

      body_text = content.split("\n").delete_if do |line|
        line[0] == "#" || line.strip == ""
      end

      refute body_text.first =~ /Today/, "Posts usually shouldn't start with \"Today\"" + "; File: " + post
    end
  end
end