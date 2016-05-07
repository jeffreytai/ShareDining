class SearchController < ApplicationController

  # extend Geocoder::Model::Mongoid

  def results
    @location = params[:location]
    @coordinates = Geocoder.coordinates(@location)

    # Kitchens within 7 miles, limit to 6
    @nearbyKitchens = Kitchen.near(@location, 10).take(6)
    puts @nearbyKitchens

  end

end
