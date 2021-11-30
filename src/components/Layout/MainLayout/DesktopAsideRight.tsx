import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const whoToFollow = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export function DesktopAsideRight() {
  const { user } = useAuth();
  return (
    <aside className="hidden xl:block xl:col-span-4">
      <div className="sticky top-4 space-y-4">
        <section aria-labelledby="who-to-follow-heading">
          <div className="bg-white rounded-lg shadow">
            <div className="flex p-6">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-16 w-16 rounded-full" src={whoToFollow[0].imageUrl} alt="" />
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
