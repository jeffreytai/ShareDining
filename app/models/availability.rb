class Availability < ActiveRecord::Base

  extend SimpleCalendar

  belongs_to :kitchen

  has_calendar attribute: :start_time

end
