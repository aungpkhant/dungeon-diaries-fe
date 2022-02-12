import React from 'react';
import { useAuth } from '@/hooks/useAuth';

export function DesktopAsideRight() {
  const { user } = useAuth();

  return (
    <aside className="hidden xl:block xl:col-span-4">
      <div className="sticky top-4 space-y-4">
        <section aria-labelledby="who-to-follow-heading">
          <div className="bg-white border-4 border-gray-700">
            <div className="flex p-6">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-16 w-16 rounded-full bg-gray-200"
                  src={user?.profile_image ?? '/assets/default_profile.png'}
                  alt=""
                />
              </div>
              <div className="ml-6 space-y-1">
                <p className="text-base font-medium text-gray-900">@{user?.username}</p>
                <div className="flex">
                  <div>
                    <p className="text-base font-medium text-gray-500">Lv 1 Slime</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex items-center">
                    <img className="h-6 w-6" src={'/assets/dungeon-monsters/slime.gif'} alt="" />
                  </div>
                </div>
                <p></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
