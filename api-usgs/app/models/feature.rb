class Feature
    include Mongoid::Document
    field :mag, type: Float
    field :place, type: String
    field :time, type: DateTime
    field :url, type: String
    field :title, type: String
    field :tsunami, type: Boolean
    field :mag_type, type: String
    field :longitude, type: Float
    field :latitude, type: Float
    field :external_id, type: String

    validates :title, :url, :place, :mag_type, :longitude, :latitude, presence: true
    validates :mag, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
    validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
    validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
    validates :url, uniqueness: true

    has_many :comments
end