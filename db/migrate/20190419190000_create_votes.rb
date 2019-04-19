class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.references :user
      t.references :voteable, polymorphic: true, index: true
      t.boolean    :upvote
      
      t.timestamps
    end
  end
end
