'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

type Step = 'details' | 'otp' | 'success';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Step 1: Register the user
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role: 'AFFILIATE' }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.message || 'Registration failed');
        setLoading(false);
        return;
      }

      // Step 2: Send OTP
      const otpRes = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();

      if (otpRes.ok) {
        setStep('otp');
        setMessage('Account created! A verification code has been sent to your email.');
      } else {
        // Registration succeeded but OTP failed - still move to OTP step
        setStep('otp');
        setError(otpData.error || 'Failed to send code. Try resending.');
      }
    } catch (_e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStep('success');
        // Redirect after a short delay
        setTimeout(() => {
          const user = data.user;
          if (user.role === 'ADMIN') {
            router.push('/admin');
          } else {
            router.push('/affiliate');
          }
        }, 2000);
      } else {
        setError(data.error || 'Invalid verification code');
      }
    } catch (_e) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('A new verification code has been sent.');
      } else {
        setError('Failed to resend code. Please try again.');
      }
    } catch (_e) {
      setError('Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f3f3a] p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#d7e54f 1px, transparent 1px), linear-gradient(90deg, #d7e54f 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo & Branding */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center w-full">
            <Image 
              src="/images/secora_logo.svg" 
              alt="SecOra" 
              width={332} 
              height={100}
              priority
            />
          </div>
          <p className="text-sm text-white/60">
            Affiliate Marketing Platform
          </p>
        </div>

        {/* Register Card */}
        <Card className="border-[#185c55] bg-white/95 backdrop-blur shadow-2xl">
          {step === 'details' && (
            <>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-[#0f3f3a]">Create your account</CardTitle>
                <CardDescription className="text-[#0f3f3a]/60">
                  Join as an affiliate partner and start earning
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#0f3f3a] font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#185c55]" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 border-[#e8f5f0] focus:border-[#185c55] focus:ring-[#185c55]"
                        required
                        autoFocus
                        autoComplete="name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#0f3f3a] font-medium">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#185c55]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-[#e8f5f0] focus:border-[#185c55] focus:ring-[#185c55]"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#d7e54f] text-[#0f3f3a] hover:bg-[#c9e53a] font-semibold"
                    size="lg"
                    disabled={loading || !name || !email}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <User className="mr-2 h-4 w-4" />
                    )}
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#d7e54f]/20">
                  <ShieldCheck className="h-6 w-6 text-[#185c55]" />
                </div>
                <CardTitle className="text-2xl text-[#0f3f3a]">Verify your email</CardTitle>
                <CardDescription className="text-[#0f3f3a]/60">
                  We sent a 6-digit code to <span className="font-medium text-[#0f3f3a]">{email}</span>
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleVerifyOTP}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {message && (
                    <Alert className="border-[#d7e54f] bg-[#d7e54f]/10">
                      <AlertDescription className="text-[#0f3f3a]">{message}</AlertDescription>
                    </Alert>
                  )}
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="border-[#e8f5f0]" />
                        <InputOTPSlot index={1} className="border-[#e8f5f0]" />
                        <InputOTPSlot index={2} className="border-[#e8f5f0]" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} className="border-[#e8f5f0]" />
                        <InputOTPSlot index={4} className="border-[#e8f5f0]" />
                        <InputOTPSlot index={5} className="border-[#e8f5f0]" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-[#d7e54f] text-[#0f3f3a] hover:bg-[#c9e53a] font-semibold"
                    size="lg"
                    disabled={loading || otp.length < 6}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="mr-2 h-4 w-4" />
                    )}
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                  </Button>
                  <div className="flex items-center justify-between w-full">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-[#185c55] hover:text-[#0f3f3a] hover:bg-[#f0f5f3]"
                      onClick={() => {
                        setStep('details');
                        setOtp('');
                        setError('');
                        setMessage('');
                      }}
                    >
                      <ArrowLeft className="mr-1 h-3 w-3" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-[#185c55] hover:text-[#0f3f3a] hover:bg-[#f0f5f3]"
                      onClick={handleResendOTP}
                      disabled={loading}
                    >
                      Resend code
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </>
          )}

          {step === 'success' && (
            <CardContent className="py-12">
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d7e54f]/20">
                  <CheckCircle2 className="h-8 w-8 text-[#185c55]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f3f3a]">Welcome aboard, {name}!</h3>
                  <p className="text-sm text-[#0f3f3a]/60 mt-1">
                    Your account has been created. Redirecting to your dashboard...
                  </p>
                </div>
                <div className="flex justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-[#185c55]" />
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Footer */}
        {step !== 'success' && (
          <p className="text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[#d7e54f] hover:text-[#c9e53a] hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
