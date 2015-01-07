source 'https://rubygems.org'

gem 'unicorn'
gem 'backbone-on-rails'
gem 'bcrypt'
gem 'bootstrap-sass'
gem 'coffee-rails', '~> 4.0.0'
gem 'font-awesome-rails'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'jbuilder', '~> 2.0'
gem 'rails', '4.0.2'
gem 'sass-rails', '~> 4.0.0'
gem 'pg'
gem 'uglifier', '>= 1.3.0'


group :production do
  gem 'pg' # dont want sqlite in production
  gem 'unicorn' # make sure you follow installation instructions for this gem
  gem 'rails_log_stdout',           github: 'heroku/rails_log_stdout'
  gem 'rails3_serve_static_assets', github: 'heroku/rails3_serve_static_assets'
end

group :doc do
  gem 'sdoc', require: false
end

group :development do
  gem 'annotate'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry-rails'
  gem 'byebug'
end

