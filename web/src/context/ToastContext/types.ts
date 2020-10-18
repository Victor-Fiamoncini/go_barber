export interface ToastMessage {
	id: string
	type?: 'success' | 'error' | 'info'
	title: string
	description?: string
}

export type ToastState = ToastMessage[]

export interface ToastContextData {
	addToast: (message: Omit<ToastMessage, 'id'>) => void
	removeToast: (id: string) => void
}
