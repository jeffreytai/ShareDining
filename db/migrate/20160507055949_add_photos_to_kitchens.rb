class AddPhotosToKitchens < ActiveRecord::Migration
  def change
    add_column :kitchens, :photos, :json
  end
end
