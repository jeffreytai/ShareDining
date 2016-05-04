class SearchController < ApplicationController

  def results
    @location = params[:location]
    @latitude = (Geocoder.search(@location))[0].latitude
    @longitude = (Geocoder.search(@location))[0].longitude
    puts @latitude
    puts @longitude
  end

end
