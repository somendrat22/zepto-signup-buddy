import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Warehouse } from "lucide-react";

const AssignProductToWarehouse = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    warehouseId: '',
    productId: '',
    basePrice: '',
    discount: '',
    totalQuantity: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get userId and token from localStorage
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');
      
      if (!userStr || !token) {
        throw new Error('User not authenticated');
      }
      
      const user = JSON.parse(userStr);
      const userId = user.id;
      
      // Prepare request body matching backend WareHouseItem structure
      const requestBody = {
        wid: formData.warehouseId,
        pid: formData.productId,
        basePrice: parseFloat(formData.basePrice),
        discount: parseFloat(formData.discount),
        totalQuantity: parseInt(formData.totalQuantity)
      };

      const response = await fetch(`http://localhost:8085/api/v1/warehouse/product/assign?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product assigned to warehouse successfully!",
        });
        // Reset form
        setFormData({
          warehouseId: '',
          productId: '',
          basePrice: '',
          discount: '',
          totalQuantity: ''
        });
      } else {
        const errorData = await response.text();
        toast({
          title: "Error",
          description: `Failed to assign product: ${errorData}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Assign Product to Warehouse</h1>
              <p className="text-white/80">Set inventory and pricing for warehouse products</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="max-w-2xl mx-auto bg-gradient-card backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Warehouse className="h-5 w-5 text-primary" />
              <span>Product Assignment Details</span>
            </CardTitle>
            <CardDescription>
              Connect products with warehouses and set pricing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Warehouse ID */}
              <div className="space-y-2">
                <Label htmlFor="warehouseId">Warehouse ID *</Label>
                <Input
                  id="warehouseId"
                  name="warehouseId"
                  type="text"
                  placeholder="Enter warehouse UUID"
                  value={formData.warehouseId}
                  onChange={handleInputChange}
                  required
                  className="bg-background"
                />
              </div>

              {/* Product ID */}
              <div className="space-y-2">
                <Label htmlFor="productId">Product ID *</Label>
                <Input
                  id="productId"
                  name="productId"
                  type="text"
                  placeholder="Enter product UUID"
                  value={formData.productId}
                  onChange={handleInputChange}
                  required
                  className="bg-background"
                />
              </div>

              {/* Pricing Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price *</Label>
                  <Input
                    id="basePrice"
                    name="basePrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount *</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.discount}
                    onChange={handleInputChange}
                    required
                    className="bg-background"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="totalQuantity">Total Quantity *</Label>
                <Input
                  id="totalQuantity"
                  name="totalQuantity"
                  type="number"
                  min="0"
                  placeholder="Enter total quantity"
                  value={formData.totalQuantity}
                  onChange={handleInputChange}
                  required
                  className="bg-background"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? "Assigning..." : "Assign Product to Warehouse"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssignProductToWarehouse;