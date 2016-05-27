class AccountController < ApplicationController

  def show
    @user = User.find(current_user.id)
    @kitchens = Kitchen.where(user_id: @user.id)
  end

end
