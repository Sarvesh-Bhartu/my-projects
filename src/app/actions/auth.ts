'use server';

import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export async function signUp(data: FormData): Promise<{ success: boolean; message: string }> {
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  if (!name || !email || !password) {
    return { success: false, message: 'All fields are required.' };
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, message: 'Account created successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
}


export async function signIn(data: FormData): Promise<{ success: boolean; message: string }> {
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: 'Signed in successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
}
