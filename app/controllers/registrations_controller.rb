class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    protected

    def after_sign_up_path_for(resource)
      UserMailer.welcome_email(resource).deliver_now
      super
    end

end
