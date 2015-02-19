OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  # provider :developer unless Rails.env.production?
  # provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'],
  #          :scope => 'email, user_friends'
  provider :facebook, "1554613958157210", "2f61d0ea5b449edf1b7fffd7e113b0bf", :scope => 'email'
end
