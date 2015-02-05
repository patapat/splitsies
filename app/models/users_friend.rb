# == Schema Information
#
# Table name: users_friends
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UsersFriend < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend,
             class_name: "User",
             foreign_key: :friend_id,
             primary_key: :id
end
