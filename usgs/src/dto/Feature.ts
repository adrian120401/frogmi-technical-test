export class Feature {
    id: string;
    type: string;
    attributes: {
      external_id: string;
      magnitude: number;
      place: string;
      time: string;
      tsunami: boolean;
      mag_type: string;
      title: string;
      coordinates: {
        longitude: number;
        latitude: number;
      };
    };
    links: {
      external_url: string;
    };
  
    constructor(
      id: string,
      type: string,
      attributes: {
        external_id: string;
        magnitude: number;
        place: string;
        time: string;
        tsunami: boolean;
        mag_type: string;
        title: string;
        coordinates: {
          longitude: number;
          latitude: number;
        };
      },
      links: {
        external_url: string;
      }
    ) {
      this.id = id;
      this.type = type;
      this.attributes = attributes;
      this.links = links;
    }
}