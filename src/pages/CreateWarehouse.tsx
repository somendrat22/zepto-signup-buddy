import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Warehouse, MapPin, User, Phone, Mail } from "lucide-react";

interface WarehouseFormData {
  email: string;
  contactNumber: string;
  warehouseAdminEmail: string;
  location: {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    country: string;
    state: string;
    pinCode: string;
    isPrimary: boolean;
  };
}

const CreateWarehouse = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<WarehouseFormData>({
    email: '',
    contactNumber: '',
    warehouseAdminEmail: '',
    location: {
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      country: '',
      state: '',
      pinCode: '',
      isPrimary: false,
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('location.')) {
      const locationField = field.replace('location.', '');
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get userId and token from localStorage
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');
      
      if (!userStr || !token) {
        throw new Error('User not authenticated');
      }
      
      const user = JSON.parse(userStr);
      const userId = user.id;
      
      // Transform data to match backend expectations
      const warehouseData = {
        wareHouseEmail: formData.email,
        wareHouseContactNumber: parseInt(formData.contactNumber),
        addressLine1: formData.location.addressLine1,
        addressLine2: formData.location.addressLine2,
        addressLine3: formData.location.addressLine3,
        city: formData.location.city,
        country: formData.location.country,
        isPrimary: formData.location.isPrimary,
        state: formData.location.state,
        pinCode: parseInt(formData.location.pinCode)
      };

      const response = await fetch(`http://localhost:8085/warehouse/create?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(warehouseData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Warehouse created successfully.",
        });
        // Reset form
        setFormData({
          email: '',
          contactNumber: '',
          warehouseAdminEmail: '',
          location: {
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
            city: '',
            country: '',
            state: '',
            pinCode: '',
            isPrimary: false,
          }
        });
      } else {
        throw new Error('Failed to create warehouse');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create warehouse. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Warehouse className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Create Warehouse
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Set up a new warehouse location with admin details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Warehouse Details */}
          <Card className="border-2 border-primary/10 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Warehouse className="h-6 w-6 text-primary" />
                Warehouse Information
              </CardTitle>
              <CardDescription>
                Basic warehouse contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Warehouse Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="warehouse@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Contact Number
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="1234567890"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="warehouseAdminEmail" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Warehouse Admin Email
                </Label>
                <Input
                  id="warehouseAdminEmail"
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.warehouseAdminEmail}
                  onChange={(e) => handleInputChange('warehouseAdminEmail', e.target.value)}
                  required
                  className="h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card className="border-2 border-primary/10 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-6 w-6 text-primary" />
                Location Details
              </CardTitle>
              <CardDescription>
                Complete warehouse address information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    placeholder="Building name, street address"
                    value={formData.location.addressLine1}
                    onChange={(e) => handleInputChange('location.addressLine1', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      placeholder="Area, locality"
                      value={formData.location.addressLine2}
                      onChange={(e) => handleInputChange('location.addressLine2', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine3">Address Line 3</Label>
                    <Input
                      id="addressLine3"
                      placeholder="Landmark"
                      value={formData.location.addressLine3}
                      onChange={(e) => handleInputChange('location.addressLine3', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={formData.location.city}
                      onChange={(e) => handleInputChange('location.city', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={formData.location.state}
                      onChange={(e) => handleInputChange('location.state', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pinCode">Pin Code *</Label>
                    <Input
                      id="pinCode"
                      placeholder="123456"
                      value={formData.location.pinCode}
                      onChange={(e) => handleInputChange('location.pinCode', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    value={formData.location.country}
                    onChange={(e) => handleInputChange('location.country', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPrimary"
                    checked={formData.location.isPrimary}
                    onCheckedChange={(checked) => handleInputChange('location.isPrimary', checked)}
                  />
                  <Label htmlFor="isPrimary" className="text-sm font-medium">
                    Set as Primary Location
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full md:w-auto min-w-[200px] h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating Warehouse...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  Create Warehouse
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWarehouse;