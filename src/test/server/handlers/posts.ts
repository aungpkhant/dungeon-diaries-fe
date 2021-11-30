import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { db, persistDb } from '../db';
import { API_URL } from '@/config';
import { delayedResponse, requireAuth } from '../utils';

type PostBody = {
  title: string;
  body: string;
};

export const postHandlers = [
  rest.get(`${API_URL}/posts`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const result = db.post.getAll();
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
  rest.post<PostBody>(`${API_URL}/posts`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;

      const result = db.post.create({
        id: nanoid(),
        ...data,
        createdAt: Date.now(),
        authorId: user.id,
      });

      persistDb('post');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
