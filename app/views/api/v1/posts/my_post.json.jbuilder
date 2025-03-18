json.posts @posts do |post|
  json.id post.id
  json.slug post.slug

  json.title post.title

  visible_columns = params[:visible_columns]&.split(',') || []

  json.status post.status if visible_columns.include?('status')
  json.last_published_at post.last_published_at if visible_columns.include?('last_published_at')

  if visible_columns.include?('categories')
    json.categories post.categories do |category|
      json.extract! category, :id, :name
    end
  end
end
