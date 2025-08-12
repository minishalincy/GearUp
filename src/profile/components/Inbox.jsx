import React, { useEffect, useState } from 'react';
import { SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Create Sendbird user before rendering the chat
  const createSendbirdUser = async (id, name, profileUrl) => {
    try {
      await axios.post(
        `https://api-${import.meta.env.VITE_SENDBIRD_APP_ID}.sendbird.com/v3/users`,
        {
          user_id: id,
          nickname: name,
          profile_url: profileUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Api-Token': import.meta.env.VITE_SENDBIRD_API_TOKEN,
          },
        }
      );
    } catch (err) {
      // Ignore if user already exists
      if (!err.response || err.response.status !== 400) {
        console.error('Error creating Sendbird user:', err);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const id = (user.primaryEmailAddress?.emailAddress || '').split('@')[0];
      setUserId(id);
      createSendbirdUser(id, user.fullName || 'Guest', user.imageUrl).finally(() =>
        setLoading(false)
      );
    }
  }, [user]);

  useEffect(() => {
    const urlFromQuery = searchParams.get('channelUrl');
    if (urlFromQuery) {
      setChannelUrl(urlFromQuery);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 p-1 pt-3">
      <SendBirdProvider
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={userId}
        nickname={user?.fullName || 'Guest'}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-6rem)] w-full">
          {/* Channel List */}
          <div className="bg-white rounded-2xl shadow-xl p-4 overflow-y-auto border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">📨 Your Chats</h2>
            <GroupChannelList
              onChannelSelect={(channel) => {
                setChannelUrl(channel?.url);
              }}
              channelListQueryParams={{
                includeEmpty: true,
              }}
            />
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200 h-full overflow-hidden">
            {channelUrl ? (
              <GroupChannel channelUrl={channelUrl} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                Select a conversation to start chatting 💬
              </div>
            )}
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}

export default Inbox;
