import { Feature } from "../dto/Feature";

interface Props {
    feature: Feature | null;
    closeModal: () => void;
}
const FeatureItem: React.FC<Props> = ({ feature, closeModal }) => {
    return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">{feature?.attributes.title}</h2>
          <p className="mb-2">
            <span className="font-semibold">Magnitude:</span> {feature?.attributes.magnitude}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Place:</span> {feature?.attributes.place}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Time:</span> {feature?.attributes.time}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Tsunami:</span> {feature?.attributes.tsunami ? 'Yes' : 'No'}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Magnitude Type:</span> {feature?.attributes.mag_type}
          </p>
          <p>
            <span className="font-semibold">Coordinates:</span> {feature?.attributes.coordinates.latitude}, {feature?.attributes.coordinates.longitude}
          </p>
          <div className="text-end">
            <button onClick={closeModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Close
            </button>
          </div>
        </div>
      </div>
    )
}

export default FeatureItem;