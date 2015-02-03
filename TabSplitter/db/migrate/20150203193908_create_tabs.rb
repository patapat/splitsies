class CreateTabs < ActiveRecord::Migration
  def change
    create_table :tabs do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.date :date, null: false
      t.float :total_amount, null: false
      t.string :tag

      t.timestamps null: false
    end

    add_index :tabs, :user_id
  end
end
