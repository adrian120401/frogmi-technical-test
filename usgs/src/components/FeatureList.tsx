import { useState, useEffect, ChangeEvent } from 'react';
import { Feature } from '../dto/Feature';
import { getFeatures } from '../api/data';
import FeatureItem from './FeatureItem';

const mgs = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg'];
const FeatureList: React.FC = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [magTypes, setMagTypes] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        async function fetchFeatures() {
            await getFeatures(currentPage, perPage, magTypes).then((response) => {
                setFeatures(response.data);
                console.log(response.pagination.total);
                setTotal(response.pagination.total);
            });
        }
        fetchFeatures();
    }, [currentPage, magTypes, perPage]);

    const handlePerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(1000, parseInt(event.target.value, 10));
        setPerPage(newValue);
    };

    const handleFeatureClick = (feature: Feature) => {
        setSelectedFeature(feature);
        setOpenModal(true)
        document.body.style.overflow = 'hidden';
    };

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleMagTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMagType = event.target.value;
        if (event.target.checked) {
          setMagTypes([...magTypes, selectedMagType]);
        } else {
          setMagTypes(magTypes.filter(type => type !== selectedMagType));
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        document.body.style.overflow = 'auto';
    }
    return (
        <div className="mb-4">
            <h2 className="text-xl text-center font-semibold mb-2">Features</h2>
            <div className="flex items-center mb-2">
                <label htmlFor="perPage" className="text-lg mr-2">
                    Per Page:
                </label>
                <input
                    type="number"
                    id="perPage"
                    className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                    min="1"
                    max="1000"
                    value={perPage}
                    onChange={handlePerPageChange}
                />
            </div>

            <div className="flex flex-row items-center">
                <h3 className='text-lg mr-2'>Filter by meg type:</h3>
                {mgs.map((magType, index) => (
                <label key={index} className="flex items-center">
                    <input
                    type="checkbox"
                    className="ml-2"
                    value={magType}
                    checked={magTypes.includes(magType)}
                    onChange={handleMagTypeChange}
                    />
                    <span>{magType.toUpperCase()}</span>
                </label>
                ))}
            </div>
            <div className="text-end mb-2 mr-2">
                <span className="text-gray-500">Total: {total}</span>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Magnitude
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Place
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Time
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Mag Type
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {features.map((feature) => (
                        <tr key={feature.id} onClick={() => handleFeatureClick(feature)} className="hover:bg-gray-100 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{feature.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {feature.attributes.magnitude}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {feature.attributes.place}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {feature.attributes.time}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {feature.attributes.mag_type}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    className={`mr-2 px-4 py-2 rounded-md ${
                        currentPage === 1
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                    }`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {'<'}
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${
                        total <= currentPage * perPage
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                    }`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={total <= currentPage * perPage}
                >
                    {'>'}
                </button>
            </div>
            {openModal && <FeatureItem feature={selectedFeature} closeModal={handleCloseModal}/>}
        </div>
    );
};

export default FeatureList;
