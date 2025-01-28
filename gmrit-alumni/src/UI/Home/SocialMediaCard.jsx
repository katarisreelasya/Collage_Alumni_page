import React from 'react';
import { InstagramEmbed, XEmbed } from 'react-social-media-embed';

export default function SocialMediaSection() {
  return (
    <div className="mx-auto space-y-10 md:space-y-0 md:space-x-6">
      {/* SVG Image on the Left */}
      <div className='flex justify-center'>
      <div className="flex-shrink-0 w-full md:w-1/2 px-4 md:px-12">
        {/* <img
          src="https://alumnihub.isavesit.org.in/static/media/graduation.afbb11da.svg"
          alt="Graduation Illustration"
          className="w-full h-auto"
        /> */}
      </div>
      </div>

      {/* Social Media Embeds on the Right */}
      <div className='flex justify-center bg-gray-100 py-4'>
      <div className="flex flex-col space-y-6 w-full md:w-2/3 items-center">
        <div className="flex flex-col  md:flex-row md:space-x-4">
          <InstagramEmbed
            url="https://www.instagram.com/p/DCrDDLsvIXU/"
            width={325}
            captioned
          />
          <XEmbed
            url="https://x.com/GMRIT1997/status/1859927817951355043"
            width={325}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
