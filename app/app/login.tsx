import React, { useState } from 'react'
import { TextInput, Image, StyleSheet, Button, View } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from 'expo-router';
import useUserStore from '@/store/useUserStore';

const LoginScreen = () => {

	const navigator = useNavigation()
	const { setError, error, setUser, setToken } = useUserStore((state: any) => state)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const login = async () => {

		fetch('http://localhost:8000/api/login', {
				method: 'POST',
				headers: {
						"Content-Type": "application/json",
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
				body: JSON.stringify({
						email,
						password,
				})
		})
		.then( res => res.json())
		.then(data => {
				if ( ! data.success ) {
					setError(data.message)
				} else {
					setUser(data.user)
					setToken(data.token)
					navigator.navigate('home')
				}
		})
	}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
		}>
			<View style={styles.loginContainer}>
				<ThemedText type='title'>Login Here</ThemedText>
				{error !== '' &&
					<View style={styles.errorContainer}>
						<ThemedText>{error}</ThemedText>
					</View>
				}
				<form style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<ThemedText>Email</ThemedText>
						<TextInput value={email} onChange={(e: any) => setEmail(e.target.value)} style={styles.inputText} />
					</View>
					<View style={styles.inputContainer}>
						<ThemedText>Password</ThemedText>
						<TextInput secureTextEntry={true} value={password} onChange={(e: any) => setPassword(e.target.value)} style={styles.inputText} />
					</View>
					<Button onPress={login} title='Login' />
				</form>
			</View>
		</ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
	loginContainer: {
		backgroundColor: '#252329',
		gap: 8,
		padding: 20,
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 15,
	},
	formContainer: {
		marginTop: 10
	},
	inputContainer: {
		marginBottom: 30
	},
	errorContainer: {
		marginTop: 10,
		padding: 20,
		backgroundColor: 'red',
		borderRadius: 15,
	},
	inputText: {
		width: '100%',
		borderRadius: 10,
		backgroundColor: '#8a8495',
		color: '#fff',
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	titleContainer: {
		width: 200,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});

export default LoginScreen