import { cn } from '@/lib/utils';
import { SignUpForm } from '../components/sign-up-form';

export default function SignUpPage() {
    return (
        <div className="flex flex-col w-full h-full justify-start pt-36 items-center">
            <h1 className={cn('text-2xl font-semibold tracking-tight')}>
                Sign up
            </h1>
            <SignUpForm />
        </div>
    );
}
