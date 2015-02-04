class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.decimal :account_balance, default: 0, precision: 6, scale: 2

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
