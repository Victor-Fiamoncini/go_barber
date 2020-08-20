import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
	provider_id: string
	day: number
	month: number
	year: number
}

@injectable()
class ListProviderAppointmentsService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	public async execute({ provider_id, day, month, year }: IRequest) {
		// const cacheData = await this.cacheProvider.recover('nada')

		const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
			{
				provider_id,
				day,
				month,
				year,
			}
		)

		// await this.cacheProvider.save('nada', 'tudo')

		return appointments
	}
}

export default ListProviderAppointmentsService
