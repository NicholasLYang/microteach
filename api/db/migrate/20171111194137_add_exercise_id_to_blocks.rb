class AddExerciseIdToBlocks < ActiveRecord::Migration[5.1]
  def change
    add_column :blocks, :exercise_id, :integer
  end
end
