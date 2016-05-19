class Reservation < ActiveRecord::Base

  attr_accessor :start_time, :end_time

  belongs_to :kitchen

  serialize :schedule

end
