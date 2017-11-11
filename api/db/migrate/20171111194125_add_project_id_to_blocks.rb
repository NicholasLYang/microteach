class AddProjectIdToBlocks < ActiveRecord::Migration[5.1]
  def change
    add_column :blocks, :project_id, :integer
  end
end
