import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Shield } from "lucide-react";

const inviteSchema = z.object({
  userName: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  userType: z.string().min(1, "Please select a user type"),
});

type InviteFormData = z.infer<typeof inviteSchema>;

const InviteAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      userType: "",
    },
  });

  const onSubmit = async (data: InviteFormData) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with your Spring Boot API endpoint
      const response = await fetch('/api/invite-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          phoneNumber: parseInt(data.phoneNumber),
          status: 'INACTIVE' // Default status for invited user
        }),
      });

      if (response.ok) {
        toast({
          title: "Invitation Sent Successfully!",
          description: `Invitation email has been sent to ${data.email}`,
        });
        form.reset();
      } else {
        throw new Error('Failed to send invitation');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Invite App Administrator
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Send an invitation to a new user to join as a Zepto Application Administrator
          </p>
        </div>

        {/* Invite Form */}
        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-card/50 border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Send Invitation
              </CardTitle>
              <CardDescription>
                Fill in the details of the user you want to invite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter username" 
                            {...field}
                            className="bg-background/50"
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
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter email address" 
                            {...field}
                            className="bg-background/50"
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Enter phone number" 
                            {...field}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Zepto-Application-Admin">
                              Zepto Application Admin
                            </SelectItem>
                            <SelectItem value="Super-Admin">
                              Super Admin
                            </SelectItem>
                            <SelectItem value="Manager">
                              Manager
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending Invitation...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Send Invitation
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 bg-muted/50 border-border/50">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">What happens next?</p>
                <ul className="space-y-1 text-xs">
                  <li>• User will be created with INACTIVE status</li>
                  <li>• Invitation email will be sent to the user</li>
                  <li>• User can accept or reject the invitation</li>
                  <li>• Status changes to ACTIVE when accepted</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InviteAdmin;