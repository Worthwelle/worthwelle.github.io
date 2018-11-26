require_relative "test_helper"

require "open-uri"
require "net/http"

class EmojiTest < Blog::Test
  def test_no_emoji
    posts.each do |post|
      content = File.read(post)
      refute_match /:[a-zA-Z0-9_]+:/, content,
        "You have emoji in your post, which we try to avoid"
    end
  end
end