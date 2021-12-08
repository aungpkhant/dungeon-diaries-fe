import React from 'react';
import { PostList } from '../components';
import { Heading } from '@/components/Elements';

export function Feed() {
  return (
    <>
      <Heading className="mb-4">Feed</Heading>
      <PostList />
    </>
  );
}
