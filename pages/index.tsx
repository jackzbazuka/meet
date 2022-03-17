import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from 'utils/clientApp'

export default function Home() {
	const [user, loading, error] = useAuthState(auth)

	return (
		<div className='grid h-full w-full place-items-center'>
			{user ? (
				<span className='text-3xl font-semibold'>Logged in Home</span>
			) : (
				<span className='text-3xl font-semibold'>Home</span>
			)}
		</div>
	)
}
