// Core imports
import { ReactNode, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { query, getDocs, where } from 'firebase/firestore'

// Native imports
import { auth, db, usersRef } from 'utils/clientApp'
import NavBar from 'components/NavBar'
import Scheduler from 'components/Scheduler'

type Props = {
	children: ReactNode
}

export default function Layout({ children }: Props) {
	const [user, loading, error] = useAuthState(auth)
	const [isNewUser, setIsNewUser] = useState(false)
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		if (user) {
			;(async () => {
				const q = query(usersRef, where('uid', '==', user.uid))
				const querySnapshot = await getDocs(q)

				if (querySnapshot.empty) {
					console.log('user does not exist')
					setIsNewUser(true)
				} else {
					querySnapshot.forEach((doc) => {
						if (doc.exists()) {
							console.log('user exists')
							console.log(doc.data())
						}
					})
				}
			})()
		}
	}, [user])

	return (
		<div className='p-1'>
			<NavBar />

			{loading ? (
				<div className='grid h-full w-full place-items-center px-1 py-60'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-8 w-8 animate-pulse text-green-700'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
						/>
					</svg>
				</div>
			) : isNewUser ? (
				<div className='grid h-full w-full place-items-center px-5 py-10'>
					<Scheduler />
				</div>
			) : (
				<div className='grid h-full w-full place-items-center px-5 py-10'>
					{children}
				</div>
			)}
		</div>
	)
}
