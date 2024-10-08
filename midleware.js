import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { geo } = req;
  
  // Check if the user is from Ireland (country code 'IE')
  if (geo?.country === 'IE') {
    return NextResponse.redirect('https://www.facebook.com/zuck/videos/1685365198984767'); // Replace with your Facebook page URL
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: '/', // Adjust this to match the routes you want to protect
};
