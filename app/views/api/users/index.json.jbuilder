json.array! @users do |user|
  json.extract! user, :id, :email, :account_balance, :created_at, :updated_at
  json.friends do
    json.array! user.friends do |friend|
      json.extract! friend, :id, :email, :account_balance, :created_at, :updated_at
    end
  end
end
