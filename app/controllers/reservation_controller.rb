require "redis"
require "json"

class ReservationController < ApplicationController

  $redis = Redis.new

  def new
    @kitchen = Kitchen.find(params[:kitchen_id])
    @censored_address = ('' == @kitchen.location.partition(',').last) ? @kitchen.location : @kitchen.location.partition(',').last
    @reservation = Reservation.new(reservation_params)
    @reservation.renter_id = current_user.id
    @reservation.kitchen_id = @kitchen.id

    # Single reservation
    if @reservation.multiple == false
      @reservation.end_date = @reservation.start_date

      @day = @reservation.start_date.strftime("%A").downcase
      @reservation.schedule = {"#{@day}": [@reservation.start_time, @reservation.end_time]}

    # Multiple reservation
    else
      @reservation.schedule = {
        "sunday": [@reservation.sunday_start_time, @reservation.sunday_end_time],
        "monday": [@reservation.monday_start_time, @reservation.monday_end_time],
        "tuesday": [@reservation.tuesday_start_time, @reservation.tuesday_end_time],
        "wednesday": [@reservation.wednesday_start_time, @reservation.wednesday_end_time],
        "thursday": [@reservation.thursday_start_time, @reservation.thursday_end_time],
        "friday": [@reservation.friday_start_time, @reservation.friday_end_time],
        "saturday": [@reservation.saturday_start_time, @reservation.saturday_end_time]
      }
    end

    # Store reservation object to use in create action (without saving)
    $redis.set "reservation", @reservation.to_json

  end

  def create
    @kitchen = Kitchen.find(params[:kitchen_id])

    # Get cached version of reservation object (hash format)
    @json_reservation = JSON.parse($redis.get("reservation"))
    @reservation = Reservation.new
    @reservation.renter_id = current_user.id
    @reservation.kitchen_id = @kitchen.id
    @reservation.multiple = @json_reservation['multiple']
    @reservation.start_date = @json_reservation['start_date'].to_date
    @reservation.end_date = @json_reservation['end_date'].to_date
    @reservation.information = params[:information]
    @reservation.schedule = @json_reservation['schedule'].to_hash

    Stripe.api_key = "sk_test_J3J9QUAayOvfqDKmbeHa4JYu"
    token = params[:stripeToken]
    @amount = params[:amount].to_i

    customer = Stripe::Customer.create(
      :source => token,
      :description => current_user.first_name + current_user.last_name,
      :email => current_user.email
    )

    charge = Stripe::Charge.create(
      :amount      => @amount * 100, # in cents
      # :description => 'Rails Stripe customer',
      :currency    => 'gbp',
      :customer    => customer.id
    )

    if @reservation.save
      UserMailer.kitchen_rental_email(User.find_by(id: @reservation.renter_id), @kitchen).deliver_now
      UserMailer.kitchen_rented_email(User.find_by(id: @kitchen.user_id), @kitchen).deliver_now
      # redirect_to [@kitchen, @reservation], notice: "Reservation is successfully made."
      redirect_to "/kitchen/#{@kitchen.token}", notice: "Reservation is successfully made."
    else
      flash[:notice] = 'Error: Reservation was not successfully added.'
    end

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  def show
    @reservation = Reservation.find(params[:id])
  end

  private
    def reservation_params
      params.require(:reservation).permit(:multiple, :start_date, :end_date, :start_time, :end_time,
                                          :sunday_start_time, :sunday_end_time, :monday_start_time, :monday_end_time,
                                          :tuesday_start_time, :tuesday_end_time, :wednesday_start_time, :wednesday_end_time,
                                          :thursday_start_time, :thursday_end_time, :friday_start_time, :friday_end_time,
                                          :saturday_start_time, :saturday_end_time
                                          )
    end

end
