class ChangeAvailabilityTypes < ActiveRecord::Migration
  def change
    change_column :availabilities, :sunday, :string
    change_column :availabilities, :monday, :string
    change_column :availabilities, :tuesday, :string
    change_column :availabilities, :wednesday, :string
    change_column :availabilities, :thursday, :string
    change_column :availabilities, :friday, :string
    change_column :availabilities, :saturday, :string
  end
end
