class Block < ApplicationRecord
  belongs_to :project
  belongs_to :exercise
end
