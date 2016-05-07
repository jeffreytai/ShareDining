class AddIndexOnTokenToKitchens < ActiveRecord::Migration
  def change
    add_index :kitchens, :token
  end
end
