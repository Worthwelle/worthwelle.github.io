# https://github.com/jekyll/jekyll/issues/6360#issuecomment-329275101

require 'pathname'

module Jekyll
	module UrlRelativizer
		def relativize_url(url)
			pageUrl = @context.registers[:page]["url"]
			if pageUrl[-1,1] == "/"
				pageDir = Pathname(pageUrl)
			else
				pageDir = Pathname(pageUrl).parent
			end
			
			if url != nil
				Pathname(url).relative_path_from(pageDir).to_s
			else
				url
				warn "Warning:".yellow + " URL is empty in " + @context.registers[:page]["url"]
			end
			
		end
	end
end
Liquid::Template.register_filter(Jekyll::UrlRelativizer)