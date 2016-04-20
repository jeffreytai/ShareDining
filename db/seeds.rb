# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(
  first_name: "Jeffrey",
  last_name: "Tai",
  email: "jeffreytai@ucla.edu",
  password: "jeffrey94",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)

User.create(
  first_name: "Mahir",
  last_name: "Shah",
  email: "testuser1@gmail.com",
  password: "password",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)

User.create(
  first_name: "James",
  last_name: "Kawakami",
  email: "testuser2@gmail.com",
  password: "password",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)

User.create(
  first_name: "Justin",
  last_name: "Chen",
  email: "testuser3@gmail.com",
  password: "password",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)
