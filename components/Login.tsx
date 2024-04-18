import Image from 'next/image';
import { login } from '../app/(auth)/login/actions';
import Logo from '@/public/images/logo-placeholder-image.png';
import Link from 'next/link';
const Login = () => {
  return (
    <section className='flex min-h-screen w-full flex-col items-center p-24'>
      <Image src={Logo} alt='Logo' width={100} />
      <h1 className='font-roboto text-5xl font-bold'>Login</h1>
      <form
        action={login}
        className='flex flex-col items-start justify-center gap-6 p-6'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email</label>
          <input
            className='rounded p-1 text-black'
            id='email'
            name='email'
            type='email'
            required
          />
        </div>
        <div>
          <p className='text-red text-xs'>Dupa</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Password</label>
          <input
            className='rounded p-1 text-black'
            id='password'
            name='password'
            type='password'
            required
          />
        </div>
        <button
          type='submit'
          className='mt-1 self-stretch rounded bg-white px-6 py-2 font-semibold text-black'
        >
          Log In
        </button>
      </form>
      <div>
        <p>
          Need an accout? Click{' '}
          <Link href='/register' className='text-link underline'>
            here
          </Link>
        </p>
      </div>
    </section>
  );
};
export { Login };
