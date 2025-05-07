import { users } from './data.js';

export async function GET() {
  return Response.json(users);
}