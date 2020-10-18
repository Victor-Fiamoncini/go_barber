import { ToastMessage } from '../../../context/ToastContext/types'

export interface ToastProps {
	message: ToastMessage
	// eslint-disable-next-line @typescript-eslint/ban-types
	style: object
}

export interface ContainerProps {
	type?: 'success' | 'error' | 'info'
	hasdescription: number
}
