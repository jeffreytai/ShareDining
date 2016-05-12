class ReservationController < ApplicationController

  def new
    @kitchen = Kitchen.find(params[:kitchen_id])
    @censored_address = ('' == @kitchen.location.partition(',').last) ? @kitchen.location : @kitchen.location.partition(',').last
    @reservation = Reservation.new
  end

  def create
    @kitchen = Kitchen.find(params[:kitchen_id])
    @reservation = Reservation.new(reservation_params)

    # Individual reservation will make start_date and end_date the same
    @reservation.end_date = ( @reservation.multiple == false ) ? @reservation.start_date : @reservation.end_date

    if @reservation.save
      redirect_to [@kitchen, @reservation], notice: "Reservation is successfully made."
    end
  end

  def show
    @reservation = Reservation.find(params[:id])
  end

  private
    def reservation_params
      params.require(:reservation).permit(:renter_id, :kitchen_id, :multiple, :start_date, :end_date
                                          #:schedule
                                          )
    end

end
