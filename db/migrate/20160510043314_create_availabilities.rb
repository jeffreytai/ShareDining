class CreateAvailabilities < ActiveRecord::Migration
  def change
    create_table :availabilities do |t|
      t.integer :kitchen_id
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps null: false
    end
  end
end
