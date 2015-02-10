json.extract! @tab, :title, :date, :tag, :total_amount, :created_at, :updated_at
json.users_tabs do
  json.array! @tab.users_tabs do |users_tab|
    json.extract! users_tab, :id, :user_id, :tab_id, :amount_owed, :paid, :created_at, :updated_at
    json.email users_tab.user.email
  end
end
