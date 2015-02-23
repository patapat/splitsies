class AuthMailer < ActionMailer::Base
  default :from => 'patricklo87@gmail.com'

  # send a signup email to the user, pass in the user object that
  # contains the user's email address
  def signup_email(email)
    mail(
      to: email,
      subject: 'Payment Reminder'
    )
  end
end
