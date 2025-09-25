import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus, Warehouse } from "lucide-react";

const inviteSchema = z.object({
  userName: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phoneNumber: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be less than 15 digits" }).regex(/^\d+$/, { message: "Phone number must contain only digits" })
});

type InviteFormData = z.infer<typeof inviteSchema>;

const InviteWarehouseAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: InviteFormData) => {
    setIsLoading(true);
    
    try {
      // Call backend API endpoint matching Postman collection structure
      const userId = "5901634f-a4f5-4160-ade4-62321bc8c131"; // Replace with actual user ID
      
      const response = await fetch(`http://localhost:8085/api/v1/warehouse-admin/invite?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: data.userName,
          email: data.email,
          phoneNumber: parseInt(data.phoneNumber)
        }),
      });

      if (response.ok) {
        toast({
          title: "Invitation sent successfully!",
          description: `Warehouse admin invitation has been sent to ${data.email}`,
        });
        form.reset();
      } else {
        const errorData = await response.text();
        toast({
          title: "Invitation failed",
          description: `Failed to send invitation: ${errorData}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Invitation failed",
        description: "Network error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back navigation */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-accent transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3 text-white">
            <div className="bg-white/20 p-3 rounded-lg">
              <Warehouse className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Invite Warehouse Admin</h1>
              <p className="text-white/80">Send invitation to warehouse administrators</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="max-w-2xl mx-auto bg-gradient-card backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5 text-primary" />
              <span>Warehouse Admin Invitation</span>
            </CardTitle>
            <CardDescription>
              Invite warehouse administrators to manage warehouse operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter admin's full name" 
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter admin's email address" 
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter admin's phone number" 
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? "Sending..." : "Send Invitation"}
                  <UserPlus className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InviteWarehouseAdmin;