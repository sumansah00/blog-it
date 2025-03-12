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
    :user_id,
    :organization_id,
    :status,
    :last_published_at

  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
