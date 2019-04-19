class Word < ApplicationRecord
  belongs_to :user
  has_many :comments, as: :commentable
end
