class AddDayToAvailability < ActiveRecord::Migration
  def change
    remove_column :availabilities, :sunday_start_time
    remove_column :availabilities, :sunday_end_time
    remove_column :availabilities, :monday_start_time
    remove_column :availabilities, :monday_end_time
    remove_column :availabilities, :tuesday_start_time
    remove_column :availabilities, :tuesday_end_time
    remove_column :availabilities, :wednesday_start_time
    remove_column :availabilities, :wednesday_end_time
    remove_column :availabilities, :thursday_start_time
    remove_column :availabilities, :thursday_end_time
    remove_column :availabilities, :friday_start_time
    remove_column :availabilities, :friday_end_time
    remove_column :availabilities, :saturday_start_time
    remove_column :availabilities, :saturday_end_time
    add_column :availabilities, :sunday, :integer
    add_column :availabilities, :monday, :integer
    add_column :availabilities, :tuesday, :integer
    add_column :availabilities, :wednesday, :integer
    add_column :availabilities, :thursday, :integer
    add_column :availabilities, :friday, :integer
    add_column :availabilities, :saturday, :integer
  end
end
