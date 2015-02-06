json.extract! @user, :email, :account_balance, :created_at, :updated_at

json.friends do
  json.array! @user.friends do |friend|
    json.extract! friend, :email, :account_balance, :created_at, :updated_at
  end
end
