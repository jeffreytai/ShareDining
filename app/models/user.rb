class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  acts_as_messageable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :kitchens, dependent: :destroy
  has_many :reviews, dependent: :destroy

  def mailboxer_email(object)
    email
  end
end
