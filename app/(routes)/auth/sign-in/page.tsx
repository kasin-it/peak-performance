import { cn } from '@/lib/utils';
import { SignInForm } from '../components/sign-in-form';

export default function SignInPage() {
    return (
        <div className="flex flex-col w-full h-full justify-start pt-36 items-center">
            <h1 className={cn('text-2xl font-semibold tracking-tight')}>
                Sign in
            </h1>
            <SignInForm />
        </div>
    );
}
