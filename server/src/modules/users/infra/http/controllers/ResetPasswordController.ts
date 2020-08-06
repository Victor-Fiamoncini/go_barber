import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetPasswordEmailService from '@modules/users/services/ResetPasswordService'

class ResetPasswordController {
	public async create(request: Request, response: Response) {
		const { password, token } = request.body

		const resetPasswordEmailService = container.resolve(
			ResetPasswordEmailService
		)

		await resetPasswordEmailService.execute({ password, token })

		return response.status(204).json()
	}
}

export default ResetPasswordController
