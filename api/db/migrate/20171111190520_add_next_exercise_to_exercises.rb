class AddNextExerciseToExercises < ActiveRecord::Migration[5.1]
  def change
    add_column :exercises, :next_exercise, :integer
  end
end
