json.extract! @user, :id, :email, :account_balance, :created_at, :updated_at

json.friends do
  json.array! @user.friends do |friend|
    json.extract! friend, :id, :email, :account_balance, :created_at, :updated_at
  end
end

json.tabs do
  json.array! @user.tabs do |tab|
    json.extract! tab, :id, :title, :date, :total_amount, :tag, :created_at, :updated_at
  end
end

json.userTabs do
  json.array! @user.users_tabs do |users_tab|
    json.extract! users_tab, :id, :user_id, :tab_id, :amount_owed, :paid, :created_at, :updated_at
    json.extract! users_tab.tab.user, :email
    json.extract! users_tab.tab, :date
  end
end

json.owedTabs do
  json.array! @user.owed_tabs do |owed_tab|
    json.extract! owed_tab, :id, :title, :date, :total_amount, :tag, :created_at, :updated_at
    json.extract! owed_tab.user, :email
  end
end
