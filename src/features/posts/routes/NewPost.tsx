import React from 'react';
import { NewPostForm } from '../components';

export function NewPost() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-6 py-4 border-b">
        <h2 className="text-gray-800 text-lg font-medium">New post</h2>
      </div>
      <div className="px-6 py-4">
        <NewPostForm />
      </div>
    </div>
  );
}
