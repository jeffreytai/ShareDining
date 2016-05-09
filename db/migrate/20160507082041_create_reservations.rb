class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :kitchen_id
      t.integer :user_id
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps null: false
    end
  end
end
