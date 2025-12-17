'use client';

export default function ContactPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <div className="space-y-6">
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-400">Get in Touch</h2>
          <p className="text-gray-300 mb-4">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="text-white">MY_EMAIL_HERE</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔵</span>
              <div>
                <div className="text-sm text-gray-400">GitHub</div>
                <div className="text-white">MY_GITHUB_URL_HERE</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔷</span>
              <div>
                <div className="text-sm text-gray-400">LinkedIn</div>
                <div className="text-white">MY_LINKEDIN_URL_HERE</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-400">Quick Actions</h2>
          <p className="text-gray-300 text-sm">
            Click the Gmail icon on the desktop to send me an email, or use the GitHub
            and LinkedIn icons to connect with me on social platforms.
          </p>
        </div>
      </div>
    </div>
  );
}


