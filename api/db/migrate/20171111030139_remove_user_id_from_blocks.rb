class RemoveUserIdFromBlocks < ActiveRecord::Migration[5.1]
  def change
    remove_column :blocks, :user_id
  end
end
