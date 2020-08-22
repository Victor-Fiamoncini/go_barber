import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn, FiMail } from 'react-icons/fi'
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

interface ForgotPasswordFormData {
	email: string
}

const ForgotPassword: React.FC = () => {
	const [loading, setLoading] = useState(false)

	const formRef = useRef<FormHandles>(null)

	const { addToast } = useToast()

	const handleSubmit = useCallback(
		async (data: ForgotPasswordFormData) => {
			try {
				setLoading(true)

				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um e-mail válido'),
				})

				await schema.validate(data, { abortEarly: false })

				await apiClient.post('/password/forgot', { email: data.email })

				addToast({
					type: 'success',
					title: 'E-mail enviado',
					description:
						'Enviamos um e-mail para confirmar sua recuperação de senha',
				})
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)

					return
				}

				addToast({
					type: 'error',
					title: 'Erro na recuperação de senha',
					description:
						'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
				})
			} finally {
				setLoading(false)
			}
		},
		[addToast]
	)

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logo} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Recuperar senha</h1>
						<Input name="email" icon={FiMail} placeholder="E-mail" />
						<Button type="submit" loading={loading}>
							Recuperar
						</Button>
					</Form>
					<Link to="/">
						<FiLogIn />
						Voltar ao login
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	)
}

export default ForgotPassword
