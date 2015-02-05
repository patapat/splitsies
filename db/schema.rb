# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150205011714) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tabs", force: true do |t|
    t.integer  "user_id",                                            null: false
    t.string   "title",                                              null: false
    t.date     "date",                                               null: false
    t.decimal  "total_amount", precision: 6, scale: 2, default: 0.0
    t.string   "tag"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
  end

  add_index "tabs", ["user_id"], name: "index_tabs_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                                                 null: false
    t.string   "password_digest",                                       null: false
    t.string   "session_token",                                         null: false
    t.decimal  "account_balance", precision: 6, scale: 2, default: 0.0
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  create_table "users_friends", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "users_friends", ["friend_id"], name: "index_users_friends_on_friend_id", using: :btree
  add_index "users_friends", ["user_id"], name: "index_users_friends_on_user_id", using: :btree

  create_table "users_tabs", force: true do |t|
    t.integer  "user_id",                                             null: false
    t.integer  "tab_id",                                              null: false
    t.decimal  "amount_owed", precision: 6, scale: 2,                 null: false
    t.boolean  "paid",                                default: false
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
  end

  add_index "users_tabs", ["tab_id"], name: "index_users_tabs_on_tab_id", using: :btree
  add_index "users_tabs", ["user_id"], name: "index_users_tabs_on_user_id", using: :btree

end
