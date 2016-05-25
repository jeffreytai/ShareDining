class ConversationsController < ApplicationController
  before_action :authenticate_user!
  before_action :get_mailbox
  before_action :get_conversation, except: [:index, :empty_trash]
  before_action :get_box, only: [:index]

  def index
    if @box.eql? "inbox"
      @conversations = @mailbox.inbox
    elsif @box.eql? "sent"
      @conversations = @mailbox.sentbox
    else
      @conversations = @mailbox.trash
    end

    @conversations = @conversations.paginate(page: params[:page], per_page: 10)
  end

  def reply
    text = params[:body]

    if text.downcase.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/).present?
      message_error = 'Error: Message includes an email.'
      flash[:notice] = message_error
      redirect_to request.referer
    elsif contains_valid_phone_number(text)
      message_error = 'Error: Message includes a phone number.'
      flash[:notice] = message_error
      redirect_to request.referer
    else
      current_user.reply_to_conversation(@conversation, text)
      redirect_to conversation_path(@conversation)
    end
  end

  def destroy
    @conversation.move_to_trash(current_user)
    redirect_to conversations_path
  end

  def restore
    @conversation.untrash(current_user)
    redirect_to conversations_path
  end

  def empty_trash
    @mailbox.trash.each do |conversation|
      conversation.receipts_for(current_user).update_all(deleted: true)
    end
    redirect_to conversations_path
  end

  def mark_as_read
    @conversation.mark_as_read(current_user)
    redirect_to conversations_path
  end

  def show
  end

  private

  def get_mailbox
    @mailbox ||= current_user.mailbox
  end

  def get_conversation
    @conversation ||= @mailbox.conversations.find(params[:id])
  end

  def get_box
    if params[:box].blank? or !["inbox","sent","trash"].include?(params[:box])
      params[:box] = 'inbox'
    end
    @box = params[:box]
  end

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
