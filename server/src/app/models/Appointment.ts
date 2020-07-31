import { uuid } from 'uuidv4'

class Appointment {
	public id: string
	public provider: string
	public date: Date

	public constructor({ provider, date }: Omit<Appointment, 'id'>) {
		this.id = uuid()
		this.provider = provider
		this.date = date
	}
}

export default Appointment
