namespace :setup do
  desc "Create default organization if it doesn't exist"
  task create_organization: :environment do
    # Skip if organization already exists
    if Organization.exists?
      puts "Organization already exists, skipping creation."
    else
      org = Organization.create!(
        name: ENV['DEFAULT_ORG_NAME'] || 'Default Organization',
        # Add any other required attributes here
      )
      puts "Created default organization: #{org.name}"
    end
  end
end

desc "Setup tasks for production environment"
task setup: ['db:migrate', 'setup:create_organization'] do
  puts "Setup completed successfully!"
end
