import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

export default interface IAppointmentesRepository {
	findByDate(date: Date): Promise<Appointment | undefined>
	findAllInMonthFromProvider(
		data: IFindAllInMonthFromProviderDTO
	): Promise<Appointment[]>
	create(data: ICreateAppointmentDTO): Promise<Appointment>
}
