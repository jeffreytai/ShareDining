class SearchController < ApplicationController

  extend Geocoder::Model::Mongoid

  def results
    @location = params[:location]
    @latitude = (Geocoder.search(@location))[0].latitude
    @longitude = (Geocoder.search(@location))[0].longitude

    # limit number of results to 6
    @nearbyKitchens = Kitchen.near(:coordinates => [@latitude, @longitude]).take(6)
  end

end
