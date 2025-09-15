import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, User, Mail, Phone, Lock, MapPin, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import deliveryHero from "@/assets/delivery-hero.jpg";

interface UserData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  userType: string;
}

interface LocationData {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  isPrimary: boolean;
}

const Signup = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: "CONSUMER",
  });
  
  const [locationData, setLocationData] = useState<LocationData>({
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    isPrimary: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!userData.userName.trim()) newErrors.userName = "Username is required";
    if (!userData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = "Invalid email format";
    
    if (!userData.password) newErrors.password = "Password is required";
    else if (userData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    
    if (!userData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(userData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!locationData.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required";
    if (!locationData.city.trim()) newErrors.city = "City is required";
    if (!locationData.state.trim()) newErrors.state = "State is required";
    if (!locationData.pinCode.trim()) newErrors.pinCode = "PIN code is required";
    else if (!/^\d{6}$/.test(locationData.pinCode)) newErrors.pinCode = "Invalid PIN code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      toast({
        title: "Account created successfully!",
        description: "Welcome to our delivery platform. You can now start ordering.",
      });
      
      // Here you would typically send the data to your backend
      console.log("User Data:", userData);
      console.log("Location Data:", locationData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden md:block">
          <div className="relative rounded-2xl overflow-hidden shadow-strong">
            <img 
              src={deliveryHero} 
              alt="Fresh groceries delivered instantly" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Fresh. Fast. Delivered.</h2>
              <p className="text-lg opacity-90">Get groceries delivered in minutes</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <Card className="w-full shadow-medium border-0 bg-gradient-card backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > 1 ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <div className={`h-1 w-12 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
              </div>
              {step === 2 && (
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
            
            <div>
              <CardTitle className="text-2xl">
                {step === 1 ? "Create your account" : "Add your address"}
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? "Join thousands of happy customers getting groceries delivered instantly" 
                  : "We'll deliver fresh groceries right to your doorstep"
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 ? (
              // Step 1: Personal Information
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Enter your username"
                      className="pl-10"
                      value={userData.userName}
                      onChange={(e) => setUserData(prev => ({ ...prev, userName: e.target.value }))}
                    />
                  </div>
                  {errors.userName && <p className="text-sm text-destructive">{errors.userName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10"
                      value={userData.phoneNumber}
                      onChange={(e) => setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      value={userData.password}
                      onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={userData.confirmPassword}
                      onChange={(e) => setUserData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userType">Account Type</Label>
                  <Select value={userData.userType} onValueChange={(value) => setUserData(prev => ({ ...prev, userType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CONSUMER">Consumer</SelectItem>
                      <SelectItem value="PREMIUM">Premium Consumer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleNext} className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              // Step 2: Address Information
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="addressLine1"
                      type="text"
                      placeholder="House/Flat number, Building name"
                      className="pl-10"
                      value={locationData.addressLine1}
                      onChange={(e) => setLocationData(prev => ({ ...prev, addressLine1: e.target.value }))}
                    />
                  </div>
                  {errors.addressLine1 && <p className="text-sm text-destructive">{errors.addressLine1}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                  <Input
                    id="addressLine2"
                    type="text"
                    placeholder="Street name, Area"
                    value={locationData.addressLine2}
                    onChange={(e) => setLocationData(prev => ({ ...prev, addressLine2: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine3">Address Line 3 (Optional)</Label>
                  <Input
                    id="addressLine3"
                    type="text"
                    placeholder="Landmark"
                    value={locationData.addressLine3}
                    onChange={(e) => setLocationData(prev => ({ ...prev, addressLine3: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={locationData.city}
                      onChange={(e) => setLocationData(prev => ({ ...prev, city: e.target.value }))}
                    />
                    {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="State"
                      value={locationData.state}
                      onChange={(e) => setLocationData(prev => ({ ...prev, state: e.target.value }))}
                    />
                    {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      type="text"
                      placeholder="PIN Code"
                      value={locationData.pinCode}
                      onChange={(e) => setLocationData(prev => ({ ...prev, pinCode: e.target.value }))}
                    />
                    {errors.pinCode && <p className="text-sm text-destructive">{errors.pinCode}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={locationData.country} onValueChange={(value) => setLocationData(prev => ({ ...prev, country: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPrimary"
                    checked={locationData.isPrimary}
                    onCheckedChange={(checked) => setLocationData(prev => ({ ...prev, isPrimary: checked as boolean }))}
                  />
                  <Label htmlFor="isPrimary" className="text-sm">
                    Set as primary address
                  </Label>
                </div>

                <Button onClick={handleSubmit} className="w-full">
                  Create Account
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;