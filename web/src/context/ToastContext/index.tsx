import React, { useContext, useCallback, useState, createContext } from 'react'
import { v4 as uuid } from 'uuid'

import ToastContainer from '../../components/ToastContainer'

import { ToastContextData, ToastState, ToastMessage } from './types'

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

export const ToastProvider: React.FC = ({ children }) => {
	const [messages, setMessages] = useState<ToastState>([])

	const addToast = useCallback(
		({ type, title, description }: Omit<ToastMessage, 'id'>) => {
			const toast = {
				id: uuid(),
				type,
				title,
				description,
			}

			setMessages(messages => [...messages, toast])
		},
		[uuid, setMessages]
	)

	const removeToast = useCallback(
		(id: string) => {
			setMessages(messages => messages.filter(message => message.id !== id))
		},
		[setMessages]
	)

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer messages={messages} />
		</ToastContext.Provider>
	)
}

export function useToast(): ToastContextData {
	const context = useContext(ToastContext)

	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}

	return context
}
