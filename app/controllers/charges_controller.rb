class ChargesController < ApplicationController

  def new
  end

  def create
    # Set your secret key: remember to change this to your live secret key in production
    # See your keys here https://dashboard.stripe.com/account/apikeys
    Stripe.api_key = "sk_test_J3J9QUAayOvfqDKmbeHa4JYu"

    # Get the credit card details submitted by the form
    # puts "stripe token: #{params[:stripeToken]}"
    # token = Stripe::Token.create(
    #   card: {
    #     "number": '4242424242424242',
    #     "exp_month": 12,
    #     "exp_year": 2017,
    #     "cvc": '123'
    #   }
    # )


    token = params[:stripeToken]

    puts "token: #{token}"

    # Amount in cents
    # @amount = 500

    customer = Stripe::Customer.create(
      # :source => token,
      :source => token,
      :description => "Example customer",
      :email => "testuser@gmail.com"
      # :email => params[:stripeEmail],
      # :source  => params[:stripeToken]
    )

    puts "created customer: #{customer.id}"

    # charge =
    Stripe::Charge.create(
      :amount      => 1000, # in cents
      # :description => 'Rails Stripe customer',
      :currency    => 'usd',
      :customer    => customer.id
    )

    puts "created charge"

  rescue Stripe::CardError => e
    puts "#{e.message}"
    flash[:error] = e.message
    redirect_to new_charge_path
  end

end
