# frozen_string_literal: true

module Api
  module V1
    module Posts
      class ReportsController < ApplicationController
        def create
          ReportsJob.perform_async(params[:post_slug], report_path.to_s, current_user.id)
          render_notice(t("in_progress", action: "Report generation"))
        end

        def download
          post = Post.find_by(slug: params[:post_slug])
          unless post.report.attached?
            render_error(t("not_found", entity: "report"), :not_found) and return
          end

          send_data post.report.download, filename: pdf_file_name, content_type: "application/pdf"
        end

        private

          def report_path
            @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}")
          end

          def pdf_file_name
            "BlogIT_post_report.pdf"
          end
      end
    end
  end
end
