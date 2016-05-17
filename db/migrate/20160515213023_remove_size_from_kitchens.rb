class RemoveSizeFromKitchens < ActiveRecord::Migration
  def change
    remove_column :kitchens, :size 
  end
end
