class ChangeTimesAgainOnAvailability < ActiveRecord::Migration
  def change
    remove_column :availabilities, :sunday_availability
    remove_column :availabilities, :monday_availability
    remove_column :availabilities, :tuesday_availability
    remove_column :availabilities, :wednesday_availability
    remove_column :availabilities, :thursday_availability
    remove_column :availabilities, :friday_availability
    remove_column :availabilities, :saturday_availability
    add_column :availabilities, :sunday_start_time, :integer
    add_column :availabilities, :sunday_end_time, :integer
    add_column :availabilities, :monday_start_time, :integer
    add_column :availabilities, :monday_end_time, :integer
    add_column :availabilities, :tuesday_start_time, :integer
    add_column :availabilities, :tuesday_end_time, :integer
    add_column :availabilities, :wednesday_start_time, :integer
    add_column :availabilities, :wednesday_end_time, :integer
    add_column :availabilities, :thursday_start_time, :integer
    add_column :availabilities, :thursday_end_time, :integer
    add_column :availabilities, :friday_start_time, :integer
    add_column :availabilities, :friday_end_time, :integer
    add_column :availabilities, :saturday_start_time, :integer
    add_column :availabilities, :saturday_end_time, :integer
  end
end
