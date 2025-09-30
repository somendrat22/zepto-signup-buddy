import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const searchSchema = z.object({
  searchTerm: z.string().trim(),
});

type SearchForm = z.infer<typeof searchSchema>;

interface Product {
  productName: string;
  manufacturerName: string;
  productImageLink: string;
  wid: string;
  pid: string;
  isAvailable: boolean;
  basePrice: number;
  discount: number;
  totalQuantity: number;
}

const SearchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit = async (data: SearchForm) => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Get userId and token from localStorage
      const userId = user?.id || localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');

      if (!userId) {
        throw new Error('User ID not found');
      }

      if (!token) {
        throw new Error('Authorization token not found');
      }

      // Build query parameters
      const params = new URLSearchParams();
      if (data.searchTerm) params.append('name', data.searchTerm);
      params.append('userId', userId);

      const response = await fetch(`http://localhost:8085/api/v1/product/search?${params.toString()}`, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to search products');
      }

      const result = await response.json();
      setProducts(result || []);
      
      toast({
        title: "Search completed",
        description: `Found ${result?.length || 0} products`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Unable to search products. Please try again.",
        variant: "destructive",
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    form.reset();
    setProducts([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">QuickMart</span>
          </Link>
          <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Search Products</h1>
            <p className="text-lg text-muted-foreground">Find the products you need quickly and easily</p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Products
              </CardTitle>
              <CardDescription>
                Enter keywords to search for products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="searchTerm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Search Products</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter product name or keywords..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Searching..." : "Search Products"}
                      <Search className="ml-2 h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" onClick={clearSearch}>
                      Clear
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Search Results */}
          {hasSearched && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Search Results ({products.length})
                </h2>
                {products.length > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {products.length} product{products.length !== 1 ? 's' : ''} found
                  </Badge>
                )}
              </div>

              {products.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria or browse all products
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <Card key={product.pid || index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                          {product.productImageLink ? (
                            <img
                              src={product.productImageLink}
                              alt={product.productName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full flex items-center justify-center ${product.productImageLink ? 'hidden' : ''}`}>
                            <Package className="h-12 w-12 text-muted-foreground" />
                          </div>
                        </div>
                        <CardTitle className="text-lg">{product.productName}</CardTitle>
                        <CardDescription>
                          by {product.manufacturerName}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Price:</span>
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-bold text-primary">
                                ₹{(product.basePrice * (1 - product.discount / 100)).toLocaleString()}
                              </span>
                              {product.discount > 0 && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₹{product.basePrice.toLocaleString()}
                                  </span>
                                  <Badge variant="secondary" className="text-xs">
                                    {product.discount}% OFF
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Stock:</span>
                            <Badge variant={product.totalQuantity > 0 ? "default" : "destructive"}>
                              {product.totalQuantity > 0 ? `${product.totalQuantity} available` : 'Out of stock'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          disabled={product.totalQuantity === 0}
                        >
                          {product.totalQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchProducts;