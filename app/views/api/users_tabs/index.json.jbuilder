json.users_tabs do
  json.array! @users_tabs do |users_tab|
    json.extract! users_tab, :id, :user_id, :tab_id, :amount_owed, :paid, :created_at, :updated_at
  end
end

json.owed_tabs do
  json.array! @owed_tabs do |owed_tab|
    json.extract! owed_tab, :id, :title, :date, :total_amount, :tag, :created_at, :updated_at
  end
end
