import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'

class ProvidersController {
	public async index(request: Request, response: Response) {
		const providers = await container.resolve(ListProvidersService).execute({
			user_id: request.user.id,
		})

		return response.status(200).json(classToClass(providers))
	}
}

export default ProvidersController
