import { Button } from '@/components/ui/button';
import Service from '@/Shared/Service';
import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OwnersDetail({ carDetail }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const sanitizeId = (raw) => raw?.split('@')[0]?.replace(/[^a-zA-Z0-9_-]/g, '') || '';

  const ensureSendBirdUser = async (id, nickname, profileUrl) => {
    if (!id) return;
    try {
      await Service.GetSendBirdUser(id);
      console.log(`ℹ SendBird user '${id}' exists — skipping creation`);
    } catch (err) {
      if (err?.response?.status === 404) {
        const resp = await Service.CreateSendBirdUser(id, nickname, profileUrl);
        console.log(`✅ Created SendBird user '${id}'`, resp.data);
      } else if (
        err?.response?.status === 400 &&
        err?.response?.data?.message?.includes("violates unique")
      ) {
        console.log(`ℹ User '${id}' already exists — skipping creation`);
      } else {
        console.error(`🚨 Failed to ensure user '${id}':`, err);
      }
    }
  };

  const OnMessageOwnerButtonClick = async () => {
    try {
      const userId = sanitizeId(user?.primaryEmailAddress?.emailAddress);
      const ownerUserId = sanitizeId(carDetail?.createdBy);

      await ensureSendBirdUser(
        userId,
        String(user?.fullName || "Anonymous"),
        String(user?.imageUrl || "")
      );

      await ensureSendBirdUser(
        ownerUserId,
        String(carDetail?.userName || "Owner"),
        String(carDetail?.userImageUrl || "")
      );

      try {
        const resp = await Service.CreateSendBirdChannel(
          [userId.trim(), ownerUserId.trim()],
          carDetail?.listingTitle || "Chat"
        );

        console.log("✅ Channel Created:", resp.data);
        const channelUrl = resp.data.channel_url;
        navigate(`/inbox?channelUrl=${encodeURIComponent(channelUrl)}`);
      } catch (err) {
        console.error("🚨 Failed to create channel:", err);
        // Optional: handle if channel already exists
      }
    } catch (err) {
      console.error("🚨 Unexpected error in SendBird flow:", err);
    }
  };

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl mb-3'>Owner / Deals</h2>
      <img
        src={carDetail?.userImageUrl}
        alt={carDetail?.userName || "Owner"}
        className='w-[70px] h-[70px] rounded-full'
      />
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
      <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>

      <Button className='w-full mt-6' onClick={OnMessageOwnerButtonClick}>
        Message Owner
      </Button>
    </div>
  );
}

export default OwnersDetail;
