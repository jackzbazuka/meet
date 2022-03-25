// Core imports
import { query, where, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

// Native imports
import { usersRef } from 'utils/clientApp'
import ScheduleTable from 'components/ScheduleTable'

type Props = {
	id: string
}

type slot = {
	day: string
	startTime: string
	endTime: string
}

export default function Profile({ id }: Props) {
	const [userSlots, setUserSlots] = useState<slot[]>([])
	const [name, setName] = useState<string>('')

	useEffect(() => {
		;(async () => {
			const q = query(usersRef, where('uid', '==', id))
			const querySnapshot = await getDocs(q)

			if (!querySnapshot.empty) {
				querySnapshot.forEach((doc) => {
					const data = doc.data()
					setName(data['username'])
					setUserSlots(data['slots'])
				})
			}
		})()
	}, [])

	return (
		<div className='grid h-full w-full place-items-center'>
			<div className=' flex w-full flex-col gap-5'>
				<h1 className='text-center text-xl font-semibold'>
					Schedule for {name}
				</h1>

				<ScheduleTable userSlots={userSlots} />
			</div>
		</div>
	)
}

export async function getServerSideProps(ctx: any) {
	const {
		params: { id },
	} = ctx

	return {
		props: {
			id,
		},
	}
}
