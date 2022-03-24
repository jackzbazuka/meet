// Core imports
import { SyntheticEvent, Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Native imports
import { auth } from 'utils/clientApp'

export default function NavBar() {
	const [user, loading, error] = useAuthState(auth)

	const router = useRouter()

	const handleSignin = async (e: SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const provider = new GoogleAuthProvider()
		await signInWithRedirect(auth, provider)
	}

	const handleSignout = (e: SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault()
		;(async () => {
			if (user) {
				await auth.signOut()
				router.reload()
			}
		})()
	}

	return (
		<div className='flex select-none flex-row items-center justify-between gap-3 p-5'>
			<Link href='/'>
				<a className='text-2xl font-semibold underline decoration-purple-500 decoration-4 underline-offset-2'>
					AKMB Meet
				</a>
			</Link>

			{!user ? (
				<button
					onClick={handleSignin}
					className='w-20 rounded-md bg-purple-700 py-2 text-center text-sm font-medium text-white transition-all hover:bg-purple-800'>
					Login
				</button>
			) : (
				<Menu as='div' className='relative'>
					<Menu.Button className='flex flex-row items-center rounded-xl bg-gray-100 p-2 transition-all hover:bg-gray-200'>
						<img
							src={String(user?.photoURL)}
							alt='Profile'
							className='h-8 w-8 rounded-full'
						/>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='ml-1 h-6 w-6 text-purple-700'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</Menu.Button>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'>
						<Menu.Items className='fixed right-6 mt-1 origin-top-right rounded-md bg-gray-100 p-1 text-sm focus:outline-none'>
							<Menu.Item>
								<button
									onClick={handleSignout}
									className='w-full p-2 text-red-600 transition-all hover:text-red-700'>
									Logout
								</button>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			)}
		</div>
	)
}
