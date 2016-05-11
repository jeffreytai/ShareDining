class AddSizeToKitchen < ActiveRecord::Migration
  def change
    add_column :kitchens, :size, :string
  end
end
