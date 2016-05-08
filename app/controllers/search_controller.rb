class SearchController < ApplicationController

  # extend Geocoder::Model::Mongoid

  def results
    @location = params[:location]
    @coordinates = Geocoder.coordinates(@location)

    # Kitchens within 15 miles
    @nearbyKitchens = Kitchen.near(@location, 15)

  end

end
