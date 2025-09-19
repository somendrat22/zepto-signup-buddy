import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Package, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProductRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    manufacturerName: "",
    quantity: "",
    basePrice: "",
    productImageLink: ""
  });

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
      // Convert quantity and basePrice to numbers for API call
      const productData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        basePrice: parseInt(formData.basePrice)
      };

      // Call backend API endpoint
      const userId = "550e8400-e29b-41d4-a716-446655440000"; // Replace with actual user ID
      const response = await fetch(`http://localhost:8085/product/register?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Product has been registered successfully.",
        });
        
        // Reset form
        setFormData({
          productName: "",
          manufacturerName: "",
          quantity: "",
          basePrice: "",
          productImageLink: ""
        });
      } else {
        throw new Error('Failed to register product');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center text-white hover:text-accent transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Package className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold">Register New Product</CardTitle>
              <CardDescription>
                Add a new product to the platform for AppAdmin and maint users
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input
                      id="productName"
                      name="productName"
                      type="text"
                      placeholder="Enter product name"
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="manufacturerName">Manufacturer Name *</Label>
                    <Input
                      id="manufacturerName"
                      name="manufacturerName"
                      type="text"
                      placeholder="Enter manufacturer name"
                      value={formData.manufacturerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="basePrice">Base Price *</Label>
                    <Input
                      id="basePrice"
                      name="basePrice"
                      type="number"
                      placeholder="Enter base price"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="productImageLink">Product Image Link</Label>
                    <Input
                      id="productImageLink"
                      name="productImageLink"
                      type="url"
                      placeholder="Enter product image URL"
                      value={formData.productImageLink}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register Product"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductRegistration;