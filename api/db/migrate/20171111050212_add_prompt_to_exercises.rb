class AddPromptToExercises < ActiveRecord::Migration[5.1]
  def change
    add_column :exercises, :prompt, :text
  end
end
