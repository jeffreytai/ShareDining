class Kitchen < ActiveRecord::Base
  serialize :washing_station, Array
  serialize :food_preparation, Array
  serialize :cookware, Array
  serialize :storage, Array
  serialize :refrigeration, Array
  serialize :ovens_fryers, Array
  serialize :oven_equipment_and_storage, Array
  serialize :baking_and_pastry, Array
  serialize :other_equipment, Array
  serialize :other_amenities, Array
end
