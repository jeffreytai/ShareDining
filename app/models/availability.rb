class Availability < ActiveRecord::Base

  # validate :valid_times

  belongs_to :kitchen

end
