class AddTutorialIdToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :tutoral_id, :integer
  end
end
