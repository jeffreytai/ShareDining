class AddCancellationPolicyToKitchen < ActiveRecord::Migration
  def change
    add_column :kitchens, :cancellation_policy, :string
  end
end
