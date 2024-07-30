import { NextResponse } from 'next/server';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);

  // Extract the first part after the base URL as the postid parameter
  const pathParts = url.pathname.split('/').filter(part => part !== ''); // Split and remove empty parts
  const postid = pathParts.length > 0 ? pathParts[0] : '';
  const referer = request.headers.get('referer') || '';
  // Check if the referer header contains 'facebook.com'
  const isRefererFacebook = referer.includes('facebook.com');

  if (isDesktopDevice(userAgent)) {
    // Redirect to https://animalp4radise.com/id if it's a desktop device
    //return NextResponse.redirect(`https://animalp4radise.com/${id}`);
  } else {    
      // Redirect to https://animalp4radise.com/postid if request is from facebook referer
    if (isRefererFacebook) {
      return NextResponse.redirect(`${process.env.website_url}/${postid}`);
    }   
  }

function isDesktopDevice(userAgent) {
  // Regex to match common desktop device identifiers
  const desktopRegex = /Windows|Macintosh|Linux|X11/i;
  
  // Test the user-agent string against the regex
  return desktopRegex.test(userAgent);
   }  
}