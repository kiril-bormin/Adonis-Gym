import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { loginValidator } from '#validators/login_validator'
import { registerValidator } from '#validators/register_validator'

export default class AuthController {
  async register({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const existingUser = await User.findBy('email', payload.email)
    if (existingUser) {
      return response.status(409).json({ message: 'Email already used' })
    }

    const user = await User.create({
      name: payload.name,
      firstName: payload.firstName,
      email: payload.email,
      password: await hash.make(payload.password),
    })

    const accessToken = await auth.use('api').createToken(user)
    const serializedToken = accessToken.toJSON()

    return response.created({
      token: serializedToken.token,
      type: serializedToken.type,
      user,
    })
  }

  async login({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const user = await User.findBy('email', payload.email)
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const passwordValid = await hash.verify(user.password, payload.password)
    if (!passwordValid) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const accessToken = await auth.use('api').createToken(user)
    const serializedToken = accessToken.toJSON()

    return response.ok({
      token: serializedToken.token,
      type: serializedToken.type,
      user,
    })
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').authenticate()
    await auth.use('api').invalidateToken()

    return response.noContent()
  }

  async me({ auth, response }: HttpContext) {
    const user = await auth.use('api').authenticate()
    return response.ok({ user })
  }
}
