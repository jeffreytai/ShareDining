class ReservationController < ApplicationController

  def new
    @kitchen_id = params[:id]
    puts @kitchen_id # doesn't work
    @reservation = Reservation.new
  end

  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.save
  end

  private
    def reservation_params
      params.require(:reservation).permit(:kitchen_id, :user_id, :start_time, :end_time)
    end

end
