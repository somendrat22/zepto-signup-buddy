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
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link to="/signin">Sign In</Link>
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

          {/* All Pages Navigation */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Available Pages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Authentication</h3>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Admin Functions</h3>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/invite-admin">Invite App Admin</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/invite-warehouse-admin">Invite Warehouse Admin</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Warehouse Management</h3>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/create-warehouse">Create Warehouse</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Product Management</h3>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/product-registration">Register Product</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/assign-product">Assign Product to Warehouse</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Consumer Features</h3>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Link to="/search-products">Search Products</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-sm">30-Min Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-accent" />
                    <span className="text-sm">Fresh Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-accent" />
                    <span className="text-sm">Free Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
