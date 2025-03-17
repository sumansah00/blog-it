json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_bloggable,
    :created_at,
    :updated_at,
    :slug,
    :status,
    :last_published_at

  json.user do
    json.extract! post.user, :id, :name
  end

  json.organization do
    json.extract! post.organization, :id, :name
  end

  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
