class CreateExercises < ActiveRecord::Migration[5.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.integer :tutorial_id

      t.timestamps
    end
  end
end
