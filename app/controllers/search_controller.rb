class SearchController < ApplicationController

  def results
    @start_date = params[:start_date]
    @end_date = params[:end_date]
    @location = params[:location]
    @coordinates = Geocoder.coordinates(@location)

    # Kitchens within 15 miles
    @nearbyKitchens = Kitchen.near(@location, 15)

  end

end
