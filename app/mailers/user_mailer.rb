class UserMailer < ApplicationMailer
  default from: 'no-reply@sharedining.com'
 
  def welcome_email(user)
    @user = user
    @url  = root_url
    mail(to: @user.email, subject: 'Welcome to ShareDining')
  end

  def new_kitchen_email(user, kitchen)
    @user = user
    @kitchen = kitchen
    @url = root_url+'kitchen/'+@kitchen.token

    mail(to: @user.email, subject: 'ShareDining: Link for kitchen "'+@kitchen.title+'"')
  end

  def kitchen_rental_email(renter, kitchen)
    @renter = renter
    @kitchen = kitchen
    @url = root_url+'kitchen/'+@kitchen.token
    
    mail(to: @renter.email, subject: 'ShareDining: Your rental of "'+@kitchen.title+'"')
  end

  def kitchen_rented_email(owner, kitchen)
    @owner = owner
    @kitchen = kitchen
    @url = root_url+'kitchen/'+@kitchen.token

    mail(to: @owner.email, subject: 'ShareDining: Your kitchen "'+@kitchen.title+'" has been rented')
  end
end
