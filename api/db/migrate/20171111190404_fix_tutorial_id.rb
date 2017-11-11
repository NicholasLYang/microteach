class FixTutorialId < ActiveRecord::Migration[5.1]
  def change
    rename_column :projects, :tutoral_id, :tutorial_id
  end
end
