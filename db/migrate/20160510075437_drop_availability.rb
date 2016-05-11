class DropAvailability < ActiveRecord::Migration
  def change
    drop_table :availabilities
  end
end
