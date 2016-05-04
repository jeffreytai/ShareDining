class SearchController < ApplicationController

  extend Geocoder::Model::Mongoid

  def results
    @location = params[:location]
    @latitude = (Geocoder.search(@location))[0].latitude
    @longitude = (Geocoder.search(@location))[0].longitude

    @nearbyKitchens = Kitchen.near(:coordinates => [@latitude, @longitude])

    # @nearbyKitchens.each do |kitchen|
    #   puts [kitchen.coordinates[1], kitchen.coordinates[0]]
    # end

  end

end
