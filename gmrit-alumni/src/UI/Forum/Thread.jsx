import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReplyForm from './ReplyForm';
import Nav from '../Nav';

const Thread = () => {
  const { thread_id } = useParams();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    // Fetch thread details
    fetch(`http://localhost:3000/api/threads/${thread_id}`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setThread(data));

    // Fetch replies
    fetch(`http://localhost:3000/api/threads/${thread_id}/replies`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setReplies(data));
  }, [thread_id]);

  if (!thread) return <div className="text-center py-6 text-gray-500">Loading...</div>;

  return (
    <div>
      <Nav />
      <div className="container mx-auto p-6">
        {/* Thread details */}
        <div className="bg-white p-6 rounded-lg shadow-lg  max-w-3xl mx-auto mb-6">
          <h2 className="text-2xl text-center font-bold text-blue-800 mb-4">{thread.title}</h2>
          <p className="text-gray-700 mb-6">{thread.content}</p>
        </div>

        {/* Flex container for replies and reply form */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Replies section */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-xl border border-gray-300 max-w-3xl mx-auto lg:mx-0">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Replies</h3>
            {replies.length > 0 ? (
              <ul className="space-y-4">
                {replies.map((reply) => (
                  <li key={reply.reply_id} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-gray-700">{reply.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No replies yet. Be the first to reply!</p>
            )}
          </div>

          {/* Reply form */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-xl border border-gray-300 max-w-3xl mx-auto lg:mx-0">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Post a Reply</h3>
            <ReplyForm threadId={thread.thread_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
