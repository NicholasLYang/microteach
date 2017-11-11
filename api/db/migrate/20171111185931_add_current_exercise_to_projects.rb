class AddCurrentExerciseToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :current_exercise, :integer
  end
end
