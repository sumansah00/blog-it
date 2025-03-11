# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    # Only allow if user and post belong to the same organization
    user.organization_id == post.organization_id
  end

  # The condition for edit policy is the same as that of the show.
  # Hence, we can simply call `show?` inside the edit? policy here.
  def edit?
    show? && (post.user_id == user.id)
  end

  # Only owner is allowed to update a post.
  def update?
    user.organization_id == post.organization_id && post.user_id == user.id
  end

  # Every user can create a post, hence create? will always returns true.
  def create?
    true
  end

  # Only the user that has created the post, can delete it.
  def destroy?
    user.organization_id == post.organization_id && post.user_id == user.id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      # Only return posts from the user's organization
      scope.where(organization_id: user.organization_id)
    end
  end
end
