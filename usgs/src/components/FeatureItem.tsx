import { useEffect, useState } from 'react';
import { Feature } from '../dto/Feature';
import { getComments, postComment } from '../api/data';

interface Props {
    feature: Feature | null;
    closeModal: () => void;
}

interface Comment {
    _id: number;
    body: string;
    created_at: string;
    updated_at: string;
    feature_id: string;
}

const FeatureItem: React.FC<Props> = ({ feature, closeModal }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentBody, setCommentBody] = useState<string>('');

    useEffect(() => {
        if (feature) {
            const fetchComments = async () => {
                const response = await getComments(feature.id);
                setComments(response.comments);
                console.log(response.comments);
            };

            fetchComments();
        }
    }, [feature]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentBody(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (commentBody.trim() !== '' && feature) {
            const response = await postComment(feature?.id, commentBody);
            setComments([response, ...comments]);
            setCommentBody('');
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{feature?.attributes.title}</h2>
                <p className="mb-2">
                    <span className="font-semibold">Magnitude:</span>{' '}
                    {feature?.attributes.magnitude}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Place:</span> {feature?.attributes.place}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Time:</span> {feature?.attributes.time}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Tsunami:</span>{' '}
                    {feature?.attributes.tsunami ? 'Yes' : 'No'}
                </p>
                <p className="mb-2">
                    <span className="font-semibold">Magnitude Type:</span>{' '}
                    {feature?.attributes.mag_type}
                </p>
                <p>
                    <span className="font-semibold">Coordinates:</span>{' '}
                    {feature?.attributes.coordinates.latitude},{' '}
                    {feature?.attributes.coordinates.longitude}
                </p>
                <div className="mt-3">
                    <h3 className="text-lg *:font-semibold mb-2">Comments:</h3>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <textarea
                            value={commentBody}
                            onChange={handleInputChange}
                            placeholder="Enter your comment..."
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Post Comment
                        </button>
                    </form>
                    <div>
                        {comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="border border-gray-200 p-2 rounded-sm"
                            >
                                <p className="text-gray-800">{comment.body}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {formatDate(comment.created_at)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-end">
                    <button
                        onClick={closeModal}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureItem;
