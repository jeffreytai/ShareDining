class ReservationController < ApplicationController

  def new
    @kitchen = Kitchen.find(params[:kitchen_id])
    @reservation = Reservation.new
  end

  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.save
  end

  private
    def reservation_params
      params.require(:reservation).permit(:kitchen_id, :renter_id, :reserve_date, :start_time, :end_time)
    end

end
