class Function < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :code, presence: true
end
