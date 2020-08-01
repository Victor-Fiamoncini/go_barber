import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '../errors/AppError'
import authConfig from '../config/auth'

interface TokenPayload {
	iat: number
	exp: number
	sub: string
}

export default (request: Request, response: Response, next: NextFunction) => {
	const { authorization } = request.headers

	if (!authorization) {
		throw new AppError('Authorization not provided', 401)
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		throw new AppError('Invalid authorization', 401)
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		throw new AppError('Invalid authorization', 401)
	}

	try {
		const decoded = verify(token, authConfig.jwt.secret)

		const { sub } = decoded as TokenPayload

		request.user = {
			id: sub,
		}

		return next()
	} catch {
		throw new AppError('Invalid authorization', 401)
	}
}
