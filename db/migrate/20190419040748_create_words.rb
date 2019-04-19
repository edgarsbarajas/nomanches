class CreateWords < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.string     :word
      t.string     :definition
      t.string     :example
      t.references :user

      t.timestamps
    end
  end
end
