class ChargesController < ApplicationController

  def new
  end

  def create
    # Set your secret key: remember to change this to your live secret key in production
    # See your keys here https://dashboard.stripe.com/account/apikeys
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

  rescue Stripe::CardError => e
    puts "#{e.message}"
    flash[:error] = e.message
    redirect_to new_charge_path
  end

end
