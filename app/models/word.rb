class Word < ApplicationRecord
  belongs_to :user
  has_many :comments, as: :commentable
  has_many :votes, as: :voteable
end
