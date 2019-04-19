class UpdateCommentsCommentColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :comments, :comment, :value
  end
end
