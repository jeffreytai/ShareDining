require 'time'

class SearchController < ApplicationController

  def results
    @start_date = params[:start_date]
    @end_date = params[:end_date]

    # Map the date to a day of the week and search for kitchens that are available on this day
    # day = Time.parse(@start_date).strftime("%A").downcase
    # @available_kitchens = Kitchen.joins(:availability).where("#{day} is not null")

    # @attribute = @availability.read_attribute("#{day}")
    # puts "attribute: #{@attribute}"

    # @end_date = params[:end_date]
    @location = params[:location]
    @coordinates = Geocoder.coordinates(@location)

    # Kitchens within 15 miles
    # @nearbyKitchens = Kitchen.near(@location, 15)
    # @nearbyKitchens = @available_kitchens.near(@location, 15)
    # @nearbyKitchens.each do |kitchen|
    #   puts kitchen.id
    # end

  end

end
