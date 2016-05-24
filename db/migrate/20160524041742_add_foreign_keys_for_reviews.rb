class AddForeignKeysForReviews < ActiveRecord::Migration
  def change
    add_reference :reviews, :user, index: true
    add_foreign_key :reviews, :users

    add_reference :reviews, :kitchen, index: true
    add_foreign_key :reviews, :kitchens
  end
end
