# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# 1. Create an organization
org = Organization.create!(name: "Blog-It Inc.")

# 2. Create a user associated with the organization
user = User.create!(
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  password_confirmation: "password123",
  organization: org
)

# 3. Create some categories
categories = [
  Category.create!(name: "Technology"),
  Category.create!(name: "Programming"),
  Category.create!(name: "Web Development"),
  Category.create!(name: "Ruby on Rails")
]

# 4. Create some posts with categories and proper associations
post1 = Post.create!(
  title: "Getting Started with Rails",
  description: "Rails is a web application framework running on the Ruby programming language...",
  user: user,
  organization: org
)
post1.categories << categories[0] << categories[3]

post2 = Post.create!(
  title: "Understanding ActiveRecord Associations",
  description: "ActiveRecord makes working with databases much easier by providing object-oriented methods...",
  user: user,
  organization: org
)
post2.categories << categories[1] << categories[3]

post3 = Post.create!(
  title: "API Development Best Practices",
  description: "When building APIs, there are several key principles to follow...",
  user: user,
  organization: org
)
post3.categories << categories[0] << categories[2]

# 5. Verify data was created properly
puts "Created #{Organization.count} organizations"
puts "Created #{User.count} users"
puts "Created #{Category.count} categories"
puts "Created #{Post.count} posts"

# Inspect a post with all its associations
example_post = Post.first.attributes.merge(
  user_name: Post.first.user.name,
  organization_name: Post.first.organization.name,
  categories: Post.first.categories.map(&:name)
)
puts example_post
