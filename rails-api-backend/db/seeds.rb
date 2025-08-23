# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb

# Clear old data
User.destroy_all

puts "Seeding users..."

users = [
  {
    full_name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    bio: "Full-stack developer who loves Rails and React."
  },
  {
    full_name: "Bob Smith",
    email: "bob@example.com",
    password: "securepass",
    bio: "Backend engineer passionate about APIs and microservices."
  },
  {
    full_name: "Charlie Brown",
    email: "charlie@example.com",
    password: "mypassword",
    bio: "Frontend specialist and pixel-perfect designer."
  },
  {
    full_name: "Diana Prince",
    email: "diana@example.com",
    password: "wonderwoman",
    bio: "Product engineer who enjoys solving complex problems."
  },
  {
    full_name: "Ethan Hunt",
    email: "ethan@example.com",
    password: "mission123",
    bio: "Security-focused engineer and adventurer."
  }
]

users.each do |user_data|
  User.create!(user_data)
end

puts "✅ Seeding completed!"
