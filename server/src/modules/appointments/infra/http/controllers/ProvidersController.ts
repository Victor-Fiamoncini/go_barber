import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'

class ProvidersController {
	public async index(request: Request, response: Response) {
		const providers = await container.resolve(ListProvidersService).execute({
			user_id: request.user.id,
		})

		return response.status(200).json(providers)
	}
}

export default ProvidersController
