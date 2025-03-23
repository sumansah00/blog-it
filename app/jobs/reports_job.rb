# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(post_slug, report_path, user_id)
    puts "Hello from ReportsJob"
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.render"), progress: 25 })
    post = Post.find_by!(slug: post_slug) # Fetch the post using post_id

    content = ApplicationController.render(
      assigns: {
        post: post
      },
      template: "posts/report/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })
    pdf_blob = WickedPdf.new.pdf_from_string(content)
    if post.report.attached?
      post.report.purge_later
    end
    post.report.attach(
      io: StringIO.new(pdf_blob), filename: "report.pdf",
      content_type: "application/pdf"
    )
    post.save!
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.attach"), progress: 100 })
    # FileUtils.mkdir_p(File.dirname(report_path)) unless File.directory?(File.dirname(report_path))
    # File.open(report_path, "wb") do |f|
    #   f.write(pdf_blob)
    # end
  end
end
