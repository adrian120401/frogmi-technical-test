namespace :fetch do
    desc "Fetch sismic data from API and save to MongoDB"
    task :sismic_data => :environment do
      require 'json'
      require 'open-uri'
  
      url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
      response = JSON.parse(URI.open(url).read)
      
      response["features"].each do |feature_data|
        feature_properties = feature_data["properties"]
        feature_geometry = feature_data["geometry"]["coordinates"]

        feature = Feature.find_or_initialize_by(id: feature_data["id"])

        feature.assign_attributes(
            mag: feature_properties["mag"],
            place: feature_properties["place"],
            time: Time.at(feature_properties["time"]),
            url: feature_properties["url"],
            tsunami: feature_properties["tsunami"].to_i,
            mag_type: feature_properties["magType"],
            title: feature_properties["title"],
            longitude: feature_geometry[0],
            latitude: feature_geometry[1]
        )

        if feature.save
            puts "Feature saved: #{feature.title}"
          else
            puts "Error saving feature: #{feature.errors.full_messages.join(', ')}"
        end
      end
      puts "Sismic data fetched and saved to MongoDB"
    end
  end
  