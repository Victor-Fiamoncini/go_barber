import React, { useCallback, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useToast } from '../../context/ToastContext'

import getValidationErrors from '../../utils/getValidationErrors'
import apiClient from '../../services/apiClient'

import { AnimationContainer, Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface ResetPasswordFormData {
	password: string
	password_confirmation: string
}

const ResetPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const history = useHistory()
	const location = useLocation()

	const { addToast } = useToast()

	const handleSubmit = useCallback(
		async (data: ResetPasswordFormData) => {
			try {
				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					password: Yup.string().required('Senha obrigatória'),
					password_confirmation: Yup.string()
						.oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
						.required(),
				})

				await schema.validate(data, { abortEarly: false })

				const { password, password_confirmation } = data
				const token = location.search.replace('?token=', '')

				if (!token) {
					throw new Error()
				}

				await apiClient.post('/password/reset', {
					password,
					password_confirmation,
					token,
				})

				history.push('/')

				addToast({
					type: 'success',
					title: 'Senha redefinida',
					description:
						'Sua senha foi redefinida com sucesso, faça o logon para continuar',
				})
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)
					return
				}

				addToast({
					type: 'error',
					title: 'Erro na redefinição de senha',
					description:
						'Ocorreu um erro ao tentar realizar a redefinição de senha, tente novamente',
				})
			}
		},
		[addToast, history, location.search]
	)

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logo} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Redefinir senha</h1>
						<Input
							name="password"
							type="password"
							icon={FiLock}
							placeholder="Nova senha"
						/>
						<Input
							name="password_confirmation"
							type="password"
							icon={FiLock}
							placeholder="Confirme a senha"
						/>
						<Button type="submit">Redefinir Senha</Button>
					</Form>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	)
}

export default ResetPassword
