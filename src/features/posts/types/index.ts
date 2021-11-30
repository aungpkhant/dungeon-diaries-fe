import { BaseEntity } from '@/types';

export type Post = {
  title: string;
  body: string;
} & BaseEntity;
