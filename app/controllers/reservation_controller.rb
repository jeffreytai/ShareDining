class ReservationController < ApplicationController

  def new
    @start_date = params[:reservation][:start_date]
    puts @start_date
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
      params.require(:reservation).permit(:reserve_date, :start_time, :end_time)
    end

end
