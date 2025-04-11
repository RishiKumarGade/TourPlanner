import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { TourFlow } from '../components/TourFlow';

const PlanDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { chats } = useStore();
  const plan = chats.find(chat => chat.id === id);

  if (!plan) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
        <Link
          to="/explore"
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            to="/explore"
            className="text-blue-500 hover:text-blue-700 flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
          <h1 className="text-3xl font-bold">
            Tour Plan: {plan.plan[0]?.place || 'Unnamed Tour'}
          </h1>
        </div>
      </div>

      {plan.plan.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <TourFlow places={plan.plan} />
        </div>
      )}

      {plan.images && plan.images.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Tour Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tour photo ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDetails;