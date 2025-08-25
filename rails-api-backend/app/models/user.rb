class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  normalizes :email, with: -> (e) { e.strip.downcase }
  has_many :functions, dependent: :destroy
  has_many :services, dependent: :destroy
end