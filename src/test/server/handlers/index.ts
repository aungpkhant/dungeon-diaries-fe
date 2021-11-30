import { authHandlers } from './auth';
import { postHandlers } from './posts';

export const handlers = [...authHandlers, ...postHandlers];
