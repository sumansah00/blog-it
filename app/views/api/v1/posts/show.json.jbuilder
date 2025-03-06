json.post do
  json.extract! @post,
    :id,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_bloggable,
    :created_at,
    :updated_at,
    :slug

  # User association
  json.user do
    json.extract! @post.user,
      :id,
      :name,
      :email
  end

  # Categories association
  json.categories @post.categories do |category|
    json.extract! category,
      :id,
      :name
  end

  # Organization association
  json.organization do
    json.extract! @post.organization,
      :id,
      :name
  end
end
