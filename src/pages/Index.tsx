import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Clock, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">QuickMart</span>
        </div>
        <div className="space-x-4">
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/invite-admin">App Admin</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/invite-warehouse-admin">Warehouse Admin</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/create-warehouse">Create Warehouse</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/product-registration">Register Product</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/assign-product">Assign Product</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/search-products">Search Products</Link>
          </Button>
          <Button asChild className="bg-white text-primary hover:bg-white/90">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Fresh Groceries
            <br />
            <span className="text-accent">Delivered in Minutes</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            Get fresh fruits, vegetables, and daily essentials delivered to your doorstep in under 30 minutes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              <Link to="/signup">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">30-Min Delivery</h3>
              <p className="opacity-80">Lightning-fast delivery to your doorstep</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">Fresh Quality</h3>
              <p className="opacity-80">Hand-picked fresh groceries every time</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="opacity-80">No delivery charges on orders above ₹199</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
