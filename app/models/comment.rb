class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :body, type: String
  belongs_to :feature
end
