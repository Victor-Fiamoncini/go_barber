import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>

	constructor() {
		this.ormRepository = getRepository(Appointment)
	}

	public async findByDate(date: Date) {
		const appointment = await this.ormRepository.findOne({ where: { date } })

		return appointment || undefined
	}

	public async create({ provider_id, date }: ICreateAppointmentDTO) {
		const appointment = this.ormRepository.create({ provider_id, date })

		await this.ormRepository.save(appointment)

		return appointment
	}
}

export default AppointmentsRepository
