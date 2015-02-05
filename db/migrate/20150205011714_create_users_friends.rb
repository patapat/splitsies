class CreateUsersFriends < ActiveRecord::Migration
  def change
    create_table :users_friends do |t|
      t.integer :user_id, null: false, index: true
      t.integer :friend_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
