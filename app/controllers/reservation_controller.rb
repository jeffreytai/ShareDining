class ReservationController < ApplicationController

  def new
    @kitchen = Kitchen.find(params[:kitchen_id])
    @reservation = Reservation.new
  end

  def create
    @kitchen = Kitchen.find(params[:kitchen_id])
    @reservation = Reservation.new(reservation_params)
    @censored_address = ('' == @kitchen.location.partition(',').last) ? @kitchen.location : @kitchen.location.partition(',').last
    @reservation.save
  end

  private
    def reservation_params
      params.require(:reservation).permit(:kitchen_id, :renter_id, :reserve_date, :start_time, :end_time)
    end

end
