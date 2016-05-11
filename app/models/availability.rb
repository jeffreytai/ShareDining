class Availability < ActiveRecord::Base

  # validate :valid_times

  belongs_to :kitchen

  # protected
  #   def valid_times
  #     if (:sunday_start_time >= :sunday_end_time) ||
  #       (:monday_start_time >= :monday_end_time) ||
  #       (:tuesday_start_time >= :tuesday_end_time) ||
  #       (:wednesday_start_time >= :wednesday_end_time) ||
  #       (:thursday_start_time >= :thursday_end_time) ||
  #       (:friday_start_time >= :friday_end_time) ||
  #       (:saturday_start_time >= :saturday_end_time)
  #         errors.add(:sunday_start_time, "Invalid time; start date must come before end date")
  #     end
  #   end
end
