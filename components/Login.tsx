'use client';
import Image from 'next/image';
import { login } from '../app/(auth)/login/actions';
import Logo from '@/public/images/logo-placeholder-image.png';
import Link from 'next/link';
import { LoginSchema } from '@/lib/schemas';
import { z } from 'zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      await login(formData);
    });
  };

  return (
    <section className='flex min-h-screen w-full flex-col items-center p-24'>
      <Image src={Logo} alt='Logo' width={100} />
      <h1 className='font-roboto text-5xl font-bold'>Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col items-start justify-center gap-6 p-6'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='johndoe@example.com'
                    autoComplete='email'
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='********'
                    autoComplete='current-password'
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type='submit'
            className='mt-1 self-stretch rounded bg-white px-6 py-2 font-semibold text-black'
          >
            Log In
          </button>
        </form>
      </Form>
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
