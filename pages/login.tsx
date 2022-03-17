import { SyntheticEvent, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'

import { auth } from 'utils/clientApp'

export default function Login() {
	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		if (user) {
			console.log(user)
		}
	})

	return <div className='grid h-screen w-full place-items-center'></div>
}

export async function getServerSideProps(ctx: any) {
	return {
		props: { greet: 'heelo' },
	}
}
