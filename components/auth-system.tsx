"use client"

import type React from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Shield,
  UserCheck,
  Heart,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"

interface AuthSystemProps {
  onAuthSuccess: (user: any) => void
}

export default function AuthSystem({ onAuthSuccess }: AuthSystemProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup" | "register">("login")
  const [userType, setUserType] = useState<"admin" | "health_worker" | "community_member">("health_worker")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    userType: "health_worker",
  })

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "health_worker",
    location: "",
    organization: "",
    licenseNumber: "",
    agreeToTerms: false,
  })

  const [registerForm, setRegisterForm] = useState({
    organizationName: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    password: "",
    confirmPassword: "",
    state: "",
    district: "",
    address: "",
    registrationNumber: "",
    agreeToTerms: false,
  })

  const states = ["Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const supabase = getSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      })

      if (signInError) {
        setError(signInError.message || "Login failed. Please check your credentials.")
        return
      }

      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError || !userData?.user) {
        setError(userError?.message || "Unable to retrieve user after login.")
        return
      }

      setSuccess("Login successful! Welcome back.")
      setTimeout(() => onAuthSuccess(userData.user), 600)
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Validation
      if (signupForm.password !== signupForm.confirmPassword) {
        setError("Passwords do not match.")
        return
      }
      if (!signupForm.agreeToTerms) {
        setError("Please agree to the terms and conditions.")
        return
      }

      const supabase = getSupabaseBrowserClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          data: {
            userType: signupForm.userType,
            firstName: signupForm.firstName,
            lastName: signupForm.lastName,
            phone: signupForm.phone,
            location: signupForm.location,
            organization: signupForm.organization || null,
            licenseNumber: signupForm.licenseNumber || null,
          },
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}`,
        },
      })

      if (signUpError) {
        setError(signUpError.message || "Signup failed. Please try again.")
        return
      }

      setSuccess("Account created! Check your email to verify your address.")
      // onAuthSuccess will be triggered after email verification + login flow
    } catch (err: any) {
      setError(err?.message || "Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validation
      if (registerForm.password !== registerForm.confirmPassword) {
        setError("Passwords do not match.")
        return
      }

      if (!registerForm.agreeToTerms) {
        setError("Please agree to the terms and conditions.")
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockUser = {
        id: "admin_" + Date.now(),
        name: registerForm.adminName,
        email: registerForm.adminEmail,
        type: "admin",
        organization: registerForm.organizationName,
        isAuthenticated: true,
      }

      setSuccess("Organization registered successfully! Admin account created.")
      setTimeout(() => onAuthSuccess(mockUser), 1000)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4 particle-system">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulse-health">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">Smart Health Monitor</h1>
            <p className="text-muted-foreground">Northeast India Disease Surveillance System</p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="glass-effect hover-lift">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Secure Access Portal
            </CardTitle>
            <CardDescription>Choose your access method to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="register">Register Org</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-usertype">User Type</Label>
                    <Select
                      value={loginForm.userType}
                      onValueChange={(value) => setLoginForm({ ...loginForm, userType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            System Administrator
                          </div>
                        </SelectItem>
                        <SelectItem value="health_worker">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Health Worker / ASHA
                          </div>
                        </SelectItem>
                        <SelectItem value="community_member">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Community Member
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname">First Name</Label>
                      <Input
                        id="signup-firstname"
                        placeholder="First name"
                        value={signupForm.firstName}
                        onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">Last Name</Label>
                      <Input
                        id="signup-lastname"
                        placeholder="Last name"
                        value={signupForm.lastName}
                        onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-10"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-usertype">User Type</Label>
                    <Select
                      value={signupForm.userType}
                      onValueChange={(value) => setSignupForm({ ...signupForm, userType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health_worker">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Health Worker / ASHA
                          </div>
                        </SelectItem>
                        <SelectItem value="community_member">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Community Member
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-location"
                        placeholder="Village/Town, District, State"
                        className="pl-10"
                        value={signupForm.location}
                        onChange={(e) => setSignupForm({ ...signupForm, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {signupForm.userType === "health_worker" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="signup-organization">Organization</Label>
                        <Input
                          id="signup-organization"
                          placeholder="Health center or organization"
                          value={signupForm.organization}
                          onChange={(e) => setSignupForm({ ...signupForm, organization: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-license">License/ID Number</Label>
                        <Input
                          id="signup-license"
                          placeholder="Professional license or ID"
                          value={signupForm.licenseNumber}
                          onChange={(e) => setSignupForm({ ...signupForm, licenseNumber: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          className="pl-10"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input
                        id="signup-confirm"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="signup-terms"
                      checked={signupForm.agreeToTerms}
                      onCheckedChange={(checked) => setSignupForm({ ...signupForm, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="signup-terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Organization Tab */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-orgname">Organization Name</Label>
                    <Input
                      id="register-orgname"
                      placeholder="Health Department / NGO / Hospital"
                      value={registerForm.organizationName}
                      onChange={(e) => setRegisterForm({ ...registerForm, organizationName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-adminname">Administrator Name</Label>
                    <Input
                      id="register-adminname"
                      placeholder="Full name of admin"
                      value={registerForm.adminName}
                      onChange={(e) => setRegisterForm({ ...registerForm, adminName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Admin Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="admin@organization.com"
                          className="pl-10"
                          value={registerForm.adminEmail}
                          onChange={(e) => setRegisterForm({ ...registerForm, adminEmail: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Admin Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          className="pl-10"
                          value={registerForm.adminPhone}
                          onChange={(e) => setRegisterForm({ ...registerForm, adminPhone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-state">State</Label>
                      <Select
                        value={registerForm.state}
                        onValueChange={(value) => setRegisterForm({ ...registerForm, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-district">District</Label>
                      <Input
                        id="register-district"
                        placeholder="District name"
                        value={registerForm.district}
                        onChange={(e) => setRegisterForm({ ...registerForm, district: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-address">Organization Address</Label>
                    <Input
                      id="register-address"
                      placeholder="Complete address"
                      value={registerForm.address}
                      onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-regnumber">Registration Number</Label>
                    <Input
                      id="register-regnumber"
                      placeholder="Official registration number"
                      value={registerForm.registrationNumber}
                      onChange={(e) => setRegisterForm({ ...registerForm, registrationNumber: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Admin Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          className="pl-10"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm">Confirm Password</Label>
                      <Input
                        id="register-confirm"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="register-terms"
                      checked={registerForm.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setRegisterForm({ ...registerForm, agreeToTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="register-terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Registering Organization...
                      </>
                    ) : (
                      "Register Organization"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="mt-4 border-destructive/50 bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4 border-success/50 bg-success/10">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Secure healthcare monitoring for Northeast India</p>
          <p className="mt-1">© 2025 Smart Health Monitor. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
