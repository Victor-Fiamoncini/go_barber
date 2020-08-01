import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

interface TokenPayload {
	iat: number
	exp: number
	sub: string
}

export default (request: Request, response: Response, next: NextFunction) => {
	const { authorization } = request.headers

	if (!authorization) {
		throw new Error('Authorization not provided')
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		throw new Error('Invalid authorization')
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		throw new Error('Invalid authorization')
	}

	try {
		const decoded = verify(token, authConfig.jwt.secret)

		const { sub } = decoded as TokenPayload

		request.user = {
			id: sub,
		}

		return next()
	} catch {
		throw new Error('Invalid authorization')
	}
}
