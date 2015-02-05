class CreateUsersTabs < ActiveRecord::Migration
  def change
    create_table :users_tabs do |t|
      t.integer :user_id, null: false, index: true
      t.integer :tab_id, null: false, index: true
      t.decimal :amount_owed, null: false, precision: 6, scale: 2
      t.boolean :paid, default: false

      t.timestamps null: false
    end
  end
end
