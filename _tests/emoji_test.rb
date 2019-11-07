require_relative "test_helper"

require "open-uri"
require "net/http"

class EmojiTest < Blog::Test
  def test_no_emoji
    posts.each do |post|
      content = remove_yaml(post)

      refute_match /[^0-9]:[a-zA-Z0-9_]+:[^0-9]/, content,
        "You have emoji in your post, which we try to avoid" + "; File: " + post
    end
  end
end