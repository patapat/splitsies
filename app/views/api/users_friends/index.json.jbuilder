json.array! @users_friends do |users_friend|
  json.extract! users_friend, :id, :email, :account_balance, :created_at, :updated_at
end
