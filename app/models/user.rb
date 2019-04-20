class User < ApplicationRecord
  has_secure_password
  has_many :words

  validates :first_name, :last_name, :email, :username, :password, presence: true
  validates :email, :username, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
