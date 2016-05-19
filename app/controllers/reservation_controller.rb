class ReservationController < ApplicationController

  def new
    @kitchen = Kitchen.find(params[:kitchen_id])
    @censored_address = ('' == @kitchen.location.partition(',').last) ? @kitchen.location : @kitchen.location.partition(',').last
    @reservation = Reservation.new(reservation_params)
    @reservation.renter_id = current_user.id
    @reservation.kitchen_id = @kitchen.id

    @start_time = @reservation.start_time
    @end_time = @reservation.end_time

    # Gets day of week from start_date
    @day = @reservation.start_date.strftime("%A").downcase
    # puts "day: #{@day}"

    # Individual reservation will make start_date and end_date the same
    @reservation.end_date = ( @reservation.multiple == false ) ? @reservation.start_date : @reservation.end_date

  end

  def create
    @kitchen = Kitchen.find(params[:kitchen_id])
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
      redirect_to [@kitchen, @reservation], notice: "Reservation is successfully made."
    else
      flash[:notice] = 'Error: Reservation was not successfully added.'
    end
  end

  def show
    @reservation = Reservation.find(params[:id])
  end

  private
    def reservation_params
      params.require(:reservation).permit(:multiple, :start_date, :end_date,
                                          :start_time, :end_time
                                          #,:schedule
                                          )
    end

end
