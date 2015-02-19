class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :session_token
      t.decimal :account_balance, default: 0, precision: 6, scale: 2
      t.string :provider
      t.string :uid
      t.string :name
      t.string :oauth_token
      t.datetime :oauth_expires_at
      t.string :image_url

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
