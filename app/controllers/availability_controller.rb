class AvailabilityController < ApplicationController

  def create
    @availability = Availability.new(availability_params)

    puts "Sunday Availability: #{@availability.sunday_availability}"
    puts "Monday Availability #{@availability.monday_availability}"
  end

  private
    def availability_params
      params.require(:availability).permit(
                                          :sunday_availability, :monday_availability, :tuesday_availability,
                                          :wednesday_availability, :thursday_availability, :friday_availability,
                                          :saturday_availability
                                          )
    end

end
