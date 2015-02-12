# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email: "patricklo87@gmail.com", password: "patpat")
User.create(email: "cj@gmail.com", password: "cjcjcj")
User.create(email: "ned@gmail.com", password: "nedned")
User.create(email: "jeff@gmail.com", password: "jeffjeff")
User.create(email: "david@gmail.com", password: "davidavid")
User.create(email: "shawna@gmail.com", password: "shawna")
User.create(email: "ryan@gmail.com", password: "ryanryan")
User.create(email: "aaron@gmail.com", password: "aaronaaron")
User.create(email: "abigail@gmail.com", password: "abigail")
User.create(email: "adam@gmail.com", password: "adamadam")
User.create(email: "amit@gmail.com", password: "amitamit")
User.create(email: "ander@gmail.com", password: "anderander")
User.create(email: "anton@gmail.com", password: "antonanton")
User.create(email: "ashoka@gmail.com", password: "ashoka")
User.create(email: "benjamin@gmail.com", password: "benben")
User.create(email: "bryce@gmail.com", password: "brycebryce")
User.create(email: "cody@gmail.com", password: "codycody")
User.create(email: "connor@gmail.com", password: "connor")
User.create(email: "dana@gmail.com", password: "danadana")
User.create(email: "davide@gmail.com", password: "davide")
User.create(email: "doug@gmail.com", password: "douglas")
User.create(email: "drew@gmail.com", password: "andrew")
User.create(email: "eric@gmail.com", password: "ericeric")
User.create(email: "felicia@gmail.com", password: "felicia")

Tab.create(title: "McDonalds", date: "2014-12-12", user_id: 1, tag: "dessert", total_amount: 12.07)
Tab.create(title: "Carls Jr.", date: "2015-02-14", user_id: 1, tag: "lunch", total_amount: 40.55)
Tab.create(title: "Burger King", date: "2014-09-21", user_id: 1, tag: "dinner", total_amount: 23.14)
Tab.create(title: "Wendy's", date: "2015-01-11", user_id: 2, tag: "birthday dinner", total_amount: 99.19)
Tab.create(title: "Jack In the Box", date: "2015-01-01", user_id: 2, tag: "breakfast", total_amount: 1402.05)
Tab.create(title: "Luckys", date: "2014-12-31", user_id: 7, tag: "groceries", total_amount: 55.63)
