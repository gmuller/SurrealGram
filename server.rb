require 'sinatra'
require 'open-uri'

set :public_folder, File.dirname(__FILE__) + '/app'

get '/' do
	redirect '/index.html'
end

get '/fetch' do
  url = params[:url]
  raise "GTFO" if (url[0] == '/' || url[0] == '.')
  response.headers['Content-Type'] = 'image/png'
  open(url).read
end