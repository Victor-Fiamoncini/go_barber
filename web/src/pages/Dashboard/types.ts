export interface MonthAvailabilityItem {
	day: number
	available: boolean
}

export interface Appointment {
	id: number
	date: string
	hourFormatted: string
	user: {
		name: string
		avatar_url: string
	}
}
