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

    @start_time = @reservation.start_time
    @end_time = @reservation.end_time

    # Gets day of week from start_date
    @day = @reservation.start_date.strftime("%A").downcase

    # Individual reservation will make start_date and end_date the same
    @reservation.end_date = ( @reservation.multiple == false ) ? @reservation.start_date : @reservation.end_date

    # Store reservation object to use in create action (without saving)
    $redis.set "reservation", @reservation.to_json

  end

  def create
    @kitchen = Kitchen.find(params[:kitchen_id])

    @json_reservation = JSON.parse($redis.get("reservation"))
    @reservation = Reservation.new
    @reservation.renter_id = current_user.id
    @reservation.kitchen_id = @kitchen.id
    @reservation.start_date = @json_reservation['start_date'].to_date
    @reservation.end_date = @json_reservation['end_date'].to_date
    @reservation.information = params[:information]
    # Need to store schedule and multiple value

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
      redirect_to [@kitchen, @reservation], notice: "Reservation is successfully made."
    else
      flash[:notice] = 'Error: Reservation was not successfully added.'
    end

  rescue Stripe::CardError => e
    # puts "#{e.message}"
    flash[:error] = e.message
    redirect_to new_charge_path
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
