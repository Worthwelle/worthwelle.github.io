require "fileutils"

require "rubygems"
require "bundler/setup"
require "minitest/autorun"
require "fastimage"
require "nokogiri"
require "redcarpet"

module Blog
  class Test < MiniTest::Test
    @@yaml_regex = /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
    # All the posts we're interested in checking. This means we're looking at
    # files that have changed on this particular branch we're on.
    #
    # Returns an Array of String filenames.
    def posts
      diffable_files = `git diff --name-only --diff-filter=ACMRTUXB origin/master... | grep .md`.split("\n")

      posts = diffable_files.select do |filename|
        File.ctime(filename) > Time.new(2014,9,3)
      end

      posts
    end

    def remove_yaml(post)
      content = File.read(post)
      content.gsub(@@yaml_regex, '')
    end
  end
end