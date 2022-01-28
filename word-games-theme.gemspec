# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "word-games-theme"
  spec.version       = "0.7.6"
  spec.authors       = ["manpreet-appscms"]
  spec.email         = ["manpreet@appscms.com"]

  spec.summary       = "Word-Games theme for all word-games-sites"
  spec.homepage      = "https://github.com/Contenttool/word-games-theme"
  spec.license       = "MIT"
  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(data|includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.9"
  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake", "~> 12.0"
end

