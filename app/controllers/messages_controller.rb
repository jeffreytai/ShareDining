class MessagesController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    recipients = User.find_by(id: params[:recipient_id])
    body = params[:message][:body]
    subject = params[:message][:subject]
    text = subject+' '+body

    if text.downcase.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/).present?
      @message_error = 'Error: Message includes an email.'
      flash[:notice] = @message_error
      redirect_to request.referer
    elsif contains_valid_phone_number(text)
      @message_error = 'Error: Message includes a phone number.'
      flash[:notice] = @message_error
      redirect_to request.referer
    else
      conversation = current_user.send_message(recipients, body, subject).conversation
      flash[:success] = "Message has been sent!"
      redirect_to conversations_path
      # redirect_to conversation_path(conversation)
    end
  end

  private

  def contains_valid_phone_number(text)
    country_code = "44"
    # Get potential phone numbers from text
    numbers = text.upcase.scan(/([^A-Z|^"]{6,})/i).collect{|x| x[0].strip }
    # Check if any of the gathered numbers is a possible phone number in the given country
    return numbers.any? { |n| plausible_phone_number(n) || plausible_phone_number(country_code+n) }
  end

  def plausible_phone_number(number)
    Phony.plausible?(number.gsub(/[^0-9]/i, ''))
  end
end
