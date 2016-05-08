class AddTokenToKitchens < ActiveRecord::Migration
  def change
    add_column :kitchens, :token, :string
  end
end
