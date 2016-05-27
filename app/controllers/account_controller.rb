class AccountController < ApplicationController

  def show
    @user = User.find(current_user.id)
    @kitchens = Kitchen.where(user_id: @user.id)
  end

  def payment
    Stripe.api_key = "sk_test_J3J9QUAayOvfqDKmbeHa4JYu"
    token = params[:stripeToken]

    puts "token: #{token}"

    customer = Stripe::Customer.create(
      :source => token,
      :description => current_user.first_name + current_user.last_name,
      :email => current_user.email
    )

    redirect_to dashboard_path

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to dashboard_path
  end

end
