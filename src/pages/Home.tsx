import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, MessageSquare, Share2, Edit } from 'lucide-react';
import { useStore } from '../store';
import { TourFlow } from '../components/TourFlow';

import { generateTourPlan } from '../helpers/generateTourPlan';

const TOUR_PROMPTS = {
  create: "Create a detailed tour plan for {location} with {days} days, including must-see attractions, local food experiences, and cultural activities. For each place, provide the name, address, coordinates, cost per person, why it's worth visiting, and recommended activities.",
  
  edit: "Modify my existing tour plan with the following changes: {changes}. Please keep the same detailed format with place names, addresses, coordinates, costs, and recommendations."
};

const Home = () => {
  const { chats, currentChat, addChat, setCurrentChat, updateChat } = useStore();
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      plan: [],
      messages: [],
      isPublic: false,
      location: '',
      days: 1
    };
    addChat(newChat);
    setCurrentChat(newChat.id);
  };

  const parseUserInput = (input) => {
    const locationMatch = input.match(/(?:in|to|for|around)\s+([A-Za-z\s,]+)/i);
    const daysMatch = input.match(/(\d+)\s*(?:day|days)/i);
    
    return {
      location: locationMatch ? locationMatch[1].trim() : 'unspecified location',
      days: daysMatch ? parseInt(daysMatch[1]) : 1
    };
  };

  const formatPrompt = (template, variables) => {
    let prompt = template;
    for (const [key, value] of Object.entries(variables)) {
      prompt = prompt.replace(`{${key}}`, value);
    }
    return prompt;
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !currentChat) return;

    const chat = chats.find(c => c.id === currentChat);
    if (!chat) return;

    const updatedMessages = [
      ...chat.messages,
      { role: 'user' as const, content: message }
    ];

    updateChat(currentChat, { messages: updatedMessages });
    
    const { location, days } = parseUserInput(message);
    
    const promptTemplate = isEditing ? TOUR_PROMPTS.edit : TOUR_PROMPTS.create;
    const promptVariables = isEditing ? { changes: message } : { location, days };
    const formattedPrompt = formatPrompt(promptTemplate, promptVariables);
    
    setMessage('');

    try {
      const response = await generateTourPlan(formattedPrompt, chat.plan);
      
      updateChat(currentChat, {
        messages: [...updatedMessages, { role: 'assistant', content: response.message }],
        plan: response.plan,
        location: location,
        days: days
      });
      
      if (isEditing) setIsEditing(false);
    } catch (error) {
      updateChat(currentChat, {
        messages: [
          ...updatedMessages, 
          { role: 'assistant', content: "I'm sorry, I couldn't create your tour plan. Please try again." }
        ]
      });
    }
  };

  const handleEditPlan = () => {
    setIsEditing(true);
    setMessage(`I'd like to modify my current plan. `);
  };

  const currentChatData = currentChat ? chats.find(c => c.id === currentChat) : null;
  const hasPlan = currentChatData?.plan && currentChatData.plan.length > 0;

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            New Chat
          </button>
        </div>
        <div className="overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setCurrentChat(chat.id)}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                currentChat === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <p className="truncate">
                {chat.location ? `${chat.location} (${chat.days} day${chat.days > 1 ? 's' : ''})` : `New Plan ${chat.id}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Tour Planner</h1>
          <div className="flex gap-2">
            {hasPlan && (
              <button
                onClick={handleEditPlan}
                className="bg-yellow-500 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Plan
              </button>
            )}
            <Link
              to="/explore"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Explore
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {hasPlan && (
            <>
              <h2 className="text-lg font-bold mb-4">
                {currentChatData.location} - {currentChatData.days} Day{currentChatData.days > 1 ? 's' : ''} Tour Plan
              </h2>
              <TourFlow places={currentChatData.plan} />
            </>
          )}
          
          <div className="space-y-4 mt-6">
            {currentChatData?.messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>

        {currentChat && (
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isEditing ? "Describe the changes you want to make..." : "Ask AI to plan your tour (e.g. '3 days in Paris')..."}
                className="flex-1 rounded-lg border p-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                {isEditing ? 'Update Plan' : 'Create Plan'}
              </button>
              {hasPlan && !isEditing && (
                <button
                  onClick={() => updateChat(currentChat, { isPublic: !currentChatData.isPublic })}
                  className={`${currentChatData.isPublic ? 'bg-green-600' : 'bg-green-500'} text-white rounded-lg px-4 py-2 flex items-center gap-2`}
                >
                  <Share2 className="w-4 h-4" />
                  {currentChatData.isPublic ? 'Shared' : 'Share'}
                </button>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {isEditing ? 
                "Tip: Specify what to add, remove, or change in your plan" :
                "Tip: Try 'Plan a 3-day trip to Tokyo with cultural experiences and local food'"
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;