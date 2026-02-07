
async function testRevalidation() {
  const secret = process.env.REVALIDATION_SECRET || process.env.SANITY_REVALIDATE_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  console.log('Testing revalidation with:');
  console.log(`- Base URL: ${baseUrl}`);
  console.log(`- Secret present: ${!!secret}`);

  if (!secret) {
    console.error('REVALIDATION_SECRET is not set in environment.');
    return;
  }

  const payload = {
    _type: 'instagramPost',
    slug: { current: 'test-post' }
  };

  try {
    const response = await fetch(`${baseUrl}/api/revalidate-sanity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a real Sanity webhook, this would be a signature, 
        // but for a quick manual test we might need to mock it if we could.
        // Since parseBody(req, secret) is used, we can't easily mock the signature without the sanity library.
      },
      body: JSON.stringify(payload)
    });

    console.log(`Response status: ${response.status}`);
    const text = await response.text();
    console.log(`Response body: ${text}`);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Note: This script is for demonstration and would need a valid Sanity signature to pass parseBody.
// The best way to verify is to trigger a manual sync in the admin panel and check the logs/UI.
