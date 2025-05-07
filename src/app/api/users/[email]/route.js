import { users } from '../data.js'

export async function GET(req, { params }) {
  const { email } = params
  const decodedEmail = decodeURIComponent(email)
  const user = users.find((u) => u.email === decodedEmail)
  if (user) {
    return Response.json(user)
  } else {
    return new Response('Not Found', { status: 404 })
  }
}

export async function PUT(req, { params }) {
  const { email } = params
  const decodedEmail = decodeURIComponent(email)
  const data = await req.json()
  const index = users.findIndex((u) => u.email === decodedEmail)
  if (index !== -1) {
    users[index] = { ...users[index], ...data }
    return Response.json(users[index])
  } else {
    return new Response('User not found', { status: 404 })
  }
}