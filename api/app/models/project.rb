class Project < ApplicationRecord
  has_many :blocks
  belongs_to :tutorial
  has_one :exercise, foreign_key: "current_exercise"
end
