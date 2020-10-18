import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useToast } from '../../context/ToastContext'

import api from '../../services/apiClient'
import getValidationErrors from '../../utils/getValidationErrors'
import logo from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { SignUpFormData } from './types'

import { AnimationContainer, Container, Content, Background } from './styles'

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const history = useHistory()

	const { addToast } = useToast()

	const handleSubmit = useCallback(
		async (data: SignUpFormData) => {
			try {
				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Digite um e-mail válido'),
					password: Yup.string().min(6, 'No mínimo 6 digitos'),
				})

				await schema.validate(data, { abortEarly: false })

				await api.post('/users', data)

				history.push('/')

				addToast({
					type: 'success',
					title: 'Cadastro realizado!',
					description: 'Você já pode fazer seu logon no GoBarber!',
				})
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)
					return
				}

				addToast({
					type: 'error',
					title: 'Erro na autenticação',
					description: 'Ocorreu um erro ao fazer o cadastro, confira os campos',
				})
			}
		},
		[addToast, history]
	)

	return (
		<Container>
			<Background />
			<Content>
				<AnimationContainer>
					<img src={logo} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu cadastro</h1>
						<Input name="name" type="text" icon={FiUser} placeholder="Nome" />
						<Input
							name="email"
							type="email"
							icon={FiMail}
							placeholder="E-mail"
						/>
						<Input
							name="password"
							type="password"
							icon={FiLock}
							placeholder="Senha"
						/>
						<Button type="submit">Cadastrar</Button>
					</Form>
					<Link to="/">
						<FiArrowLeft />
						Voltar para logon
					</Link>
				</AnimationContainer>
			</Content>
		</Container>
	)
}

export default SignUp
