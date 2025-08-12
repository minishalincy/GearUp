import React, { useEffect, useState } from 'react';
import { SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { useSearchParams } from 'react-router-dom';

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [searchParams] = useSearchParams();

 useEffect(() => {
    if (user) {
      const id = (user.primaryEmailAddress?.emailAddress || '').split('@')[0];
      setUserId(id);
    }
  }, [user]);

  useEffect(() => {
    const urlFromQuery = searchParams.get("channelUrl");
    if (urlFromQuery) {
      setChannelUrl(urlFromQuery);
    }
  }, [searchParams]);
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 p-1 pt-20">
      <SendBirdProvider
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={userId}
        nickname={user?.fullName || 'Guest'}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-250 w-full">
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
