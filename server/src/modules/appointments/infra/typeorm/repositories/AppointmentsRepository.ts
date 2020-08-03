import { EntityRepository, Repository } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
	implements IAppointmentsRepository {
	public async findByDate(date: Date) {
		const appointment = await this.findOne({ where: { date } })

		return appointment || undefined
	}
}

export default AppointmentsRepository
