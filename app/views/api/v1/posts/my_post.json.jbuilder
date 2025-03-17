json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :created_at,
    :updated_at,
    :slug,
    :status,
    :last_published_at

  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
