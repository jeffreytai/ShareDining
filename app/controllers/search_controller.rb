require 'time'

class SearchController < ApplicationController

  def results
    @start_date = params[:start_date]
    day = Time.parse(@start_date).strftime("%A").downcase
    puts "day: #{day}"

    # @end_date = params[:end_date]
    @location = params[:location]
    @coordinates = Geocoder.coordinates(@location)

    # Kitchens within 15 miles
    @nearbyKitchens = Kitchen.near(@location, 15)

  end

end
