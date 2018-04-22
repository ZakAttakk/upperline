require './config/environment'
require './app/models/transmogrifier'
require './app/models/myModel'

class ApplicationController < Sinatra::Base
  configure do
    set :public_folder, 'public'
    set :views, 'app/views'
  end

  get '/' do
    return erb :index
  end
  
  post "/results" do
    # stuff =  params.to_s
    userphrase = params["catchphrase"]
    @finalphrase = mutate(userphrase)
    return erb :results
    
  end
  
  post "/addItem" do
    item = params["item"]
    # dueDate = params["dueDate"]
    # @entry = item + " is due " + dueDate
    
    writeList(item)
    
    return erb :index
    
  end
  
  post "/showList" do
    @data = readList()
    return erb :myList
    
  end
  
  post "/showListOnPage" do
    @data = readList()
    return erb :index
    
  end
  
end
