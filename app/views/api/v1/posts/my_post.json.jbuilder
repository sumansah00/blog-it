json.posts @posts do |post|
  # Always include id, slug as they are essential
  json.id post.id
  json.slug post.slug

  # Always include title as it's required
  json.title post.title

  # Get visible columns from params, defaulting to all columns if not specified
  visible_columns = params[:visible_columns]&.split(',') || []

  # Conditionally include other attributes based on visible_columns
  json.status post.status if visible_columns.include?('status')
  json.last_published_at post.last_published_at if visible_columns.include?('last_published_at')

  # Include categories only if specified
  if visible_columns.include?('categories')
    json.categories post.categories do |category|
      json.extract! category, :id, :name
    end
  end
end
