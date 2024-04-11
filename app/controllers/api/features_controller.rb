module Api
  class FeaturesController < ApplicationController
    
    def create_comment
      feature = Feature.find_by(id: params[:feature_id])
    
      unless feature
        render json: { error: "Feature not found" }, status: :not_found
        return
      end
    
      if params[:body].blank?
        render json: { error: "Comment body cannot be blank" }, status: :unprocessable_entity
        return
      end
    
      comment = Comment.new(feature_id: feature.id, body: params[:body])
    
      if comment.save
        render json: comment, status: :created
      else
        render json: { error: "Failed to save comment" }, status: :unprocessable_entity
      end
    end
    def index
      features = Feature.all
      features = filter_by_mag_type(features)

      if params[:per_page].present? && params[:per_page].to_i > 1000
        render json: { error: "per_page must be less than or equal to 1000" }, status: :bad_request
        return
      end

      return if performed?

      features = features.page(params[:page]).per(params[:per_page] || 10)

      serialized_features = features.map do |feature|
        {
          id: feature.id,
          type: 'feature',
          attributes: {
            external_id: feature.id,
            magnitude: feature.mag,
            place: feature.place,
            time: feature.time,
            tsunami: feature.tsunami,
            mag_type: feature.mag_type,
            title: feature.title,
            coordinates: {
              longitude: feature.longitude,
              latitude: feature.latitude
            }
          },
          links: {
            external_url: feature.url
          }
        }
      end

      pagination_data = {
        current_page: features.current_page,
        total: features.total_count,
        per_page: features.limit_value
      }

      render json: { pagination: pagination_data,data: serialized_features }, meta: pagination_meta(features)
    end

    private

    def filter_by_mag_type(features)
      if params[:mag_type].present?
        valid_mag_types = %w(md ml ms mw me mi mb mlg)
        mag_types = params[:mag_type].split(',').map(&:strip)
    
        invalid_mag_types = mag_types - valid_mag_types
        if invalid_mag_types.present?
          render json: { error: "Invalid mag_type values provided: #{invalid_mag_types.join(', ')}" }, status: :not_found
          return Feature.none
        end
    
        mag_type_criteria = mag_types.map { |type| { mag_type: type } }
        features.or(mag_type_criteria)
      else
        features
      end
    end

    def pagination_meta(collection)
      {
        current_page: collection.current_page,
        total: collection.total_count,
        per_page: collection.limit_value
      }
    end
  end
end