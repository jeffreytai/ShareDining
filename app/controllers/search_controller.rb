class SearchController < ApplicationController

  def results
    @location = params[:location]
  end

end
