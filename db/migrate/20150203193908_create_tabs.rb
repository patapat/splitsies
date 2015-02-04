class CreateTabs < ActiveRecord::Migration
  def change
    create_table :tabs do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.date :date, null: false
      t.decimal :total_amount, default: 0, precision: 6, scale: 2
      t.string :tag

      t.timestamps null: false
    end

    add_index :tabs, :user_id
  end
end
