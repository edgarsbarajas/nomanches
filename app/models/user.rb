class User < ApplicationRecord
  has_secure_password
  has_secure_token :auth_token
  has_many :words

  validates :first_name, :last_name, :email, :username, :password, presence: true
  validates :email, :username, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  # This method is not available in has_secure_token
  def invalidate_auth_token
    self.update_columns(auth_token: nil)
  end

  def self.valid_login?(email, password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end
  end
end
