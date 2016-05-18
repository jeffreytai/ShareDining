class Availability < ActiveRecord::Base

  belongs_to :kitchen

  serialize :sunday, Array
  serialize :monday, Array
  serialize :tuesday, Array
  serialize :wednesday, Array
  serialize :thursday, Array
  serialize :friday, Array
  serialize :saturday, Array

end
