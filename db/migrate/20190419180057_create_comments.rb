class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string      :comment
      t.references  :commentable, polymorphic: true, index: true
      t.references  :user

      t.timestamps
    end
  end
end
