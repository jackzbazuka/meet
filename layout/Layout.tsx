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
						className='h-8 w-8 animate-spin'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
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
