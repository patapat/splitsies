# == Schema Information
#
# Table name: tabs
#
#  id           :integer          not null, primary key
#  owner_id     :integer          not null
#  title        :string           not null
#  date         :date             not null
#  total_amount :float            not null
#  tag          :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class TabTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
