# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  account_balance :decimal(6, 2)    default("0")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  # validates :email, presence: true, uniqueness: true
  # validates :password, length: { minimum: 6, allow_nil: true}
  # validates :password_digest, :session_token, presence: true

  attr_reader :password

  has_many :tabs

  has_many :users_tabs
  has_many :owed_tabs,
            through: :users_tabs,
            source: :tab

  has_many :users_friends
  has_many :friends,
            through: :users_friends,
            source: :friend

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.from_omniauth(auth)
    puts auth.info
    puts "----------------------------------------------"
    puts auth.info.image
    where(auth.slice(:provider, :uid).permit!).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.email = auth.info.email
      user.image_url = auth.info.image
      # user.friends = auth.user_friends
      user.save!
    end
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
