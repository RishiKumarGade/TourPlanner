import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

const Explore = () => {
  const { chats } = useStore();
  const publicPlans = chats.filter(chat => chat.isPublic);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Explore Tour Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publicPlans.map(plan => (
          <Link
            key={plan.id}
            to={`/explore/${plan.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {plan.plan[0]?.image ? (
              <img
                src={plan.plan[0].image}
                alt={plan.plan[0].place}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                No image available
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {plan.plan[0]?.place || 'Unnamed Tour'}
              </h2>
              <p className="text-gray-600">
                {plan.plan.length} destinations
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;