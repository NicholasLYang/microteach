class Tutorial < ApplicationRecord
  has_many :exercises
  has_many :projects
end
