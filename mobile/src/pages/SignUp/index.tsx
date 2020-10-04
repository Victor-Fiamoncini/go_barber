import React from 'react'
import {
	Image,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import {
	Container,
	BackToSignInButton,
	BackToSignInButtonText,
	Title,
} from './styles'

const SignUp: React.FC = () => {
	const navigation = useNavigation()

	return (
		<>
			<KeyboardAvoidingView
				enabled
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<ScrollView
					contentContainerStyle={{ flex: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					<Container>
						<Image source={logoImg} />
						<View>
							<Title>Crie sua conta</Title>
						</View>
						<Input name="name" icon="user" placeholder="Nome" />
						<Input name="email" icon="mail" placeholder="E-mail" />
						<Input name="password" icon="lock" placeholder="Senha" />
						<Button>Entrar</Button>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			<BackToSignInButton onPress={() => navigation.goBack()}>
				<Feather name="arrow-left" size={20} color="#fff" />
				<BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
			</BackToSignInButton>
		</>
	)
}

export default SignUp
