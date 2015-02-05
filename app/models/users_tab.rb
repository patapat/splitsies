# == Schema Information
#
# Table name: users_tabs
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  tab_id      :integer          not null
#  amount_owed :decimal(6, 2)    not null
#  paid        :boolean          default("false")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class UsersTab < ActiveRecord::Base
  belongs_to :user
  belongs_to :tab
end
