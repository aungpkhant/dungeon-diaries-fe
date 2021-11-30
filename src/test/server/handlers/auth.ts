import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { db, persistDb } from '../db';
import { API_URL } from '@/config';
import { authenticate, delayedResponse, hash, requireAuth } from '../utils';

type LoginBody = {
  email: string;
  password: string;
};

type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

export const authHandlers = [
  rest.post<RegisterBody>(`${API_URL}/auth/register`, (req, res, ctx) => {
    try {
      const userObject = req.body;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        throw new Error('The user already exists');
      }

      db.user.create({
        ...userObject,
        id: nanoid(),
        createdAt: Date.now(),
        role: 'USER',
        password: hash(userObject.password),
      });

      persistDb('user');

      const result = authenticate({ email: userObject.email, password: userObject.password });

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.post<LoginBody>(`${API_URL}/auth/login`, (req, res, ctx) => {
    try {
      const credentials = req.body;
      const result = authenticate(credentials);
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.get(`${API_URL}/auth/me`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);

      return delayedResponse(ctx.json(user));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
