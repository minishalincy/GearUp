import { Button } from '@/components/ui/button';
import Service from '@/Shared/Service';
import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OwnersDetail({ carDetail }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const sanitizeId = (raw) =>
    raw?.split('@')[0]?.replace(/[^a-zA-Z0-9_-]/g, '') || '';

  const createSendBirdUserIfNeeded = async (id, nickname, profileUrl) => {
    if (!id) return;
    try {
      await Service.CreateSendBirdUser(id, nickname, profileUrl);
      console.log(`✅ Created SendBird user '${id}'`);
    } catch (err) {
      const msg = err?.response?.data?.message || '';
      if (msg.includes('User already exists')) {
        console.log(`ℹ User '${id}' already exists — ignoring`);
      } else {
        console.error(`🚨 Failed to create user '${id}':`, err?.response?.data || err);
      }
    }
  };

  const OnMessageOwnerButtonClick = async () => {
    try {
      const userId = sanitizeId(user?.primaryEmailAddress?.emailAddress);
      const ownerUserId = sanitizeId(carDetail?.createdBy);

      await createSendBirdUserIfNeeded(
        userId,
        String(user?.fullName || 'Anonymous'),
        String(user?.imageUrl || '')
      );

      await createSendBirdUserIfNeeded(
        ownerUserId,
        String(carDetail?.userName || 'Owner'),
        String(carDetail?.userImageUrl || '')
      );

      try {
        const resp = await Service.CreateSendBirdChannel(
          [userId.trim(), ownerUserId.trim()],
          carDetail?.listingTitle || 'Chat'
        );

        console.log('✅ Channel Created:', resp.data);
        const channelUrl = resp.data.channel_url;
        navigate(`/profile?tab=inbox&channelUrl=${encodeURIComponent(channelUrl)}`);
      } catch (err) {
        console.error('🚨 Failed to create channel:', err?.response?.data || err);
      }
    } catch (err) {
      console.error('🚨 Unexpected error in SendBird flow:', err);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner / Deals</h2>
      <img
        src={carDetail?.userImageUrl}
        alt={carDetail?.userName || 'Owner'}
        className="w-[70px] h-[70px] rounded-full"
      />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>

      <Button className="w-full mt-6" onClick={OnMessageOwnerButtonClick}>
        Message Owner
      </Button>
    </div>
  );
}

export default OwnersDetail;
