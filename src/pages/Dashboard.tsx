import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, UserType } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Users, 
  Warehouse, 
  Package, 
  Search,
  LogOut,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  const renderDashboardContent = () => {
    switch (user.userType) {
      case UserType.CONSUMER:
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse and search for products
                </p>
                <Button asChild className="w-full">
                  <Link to="/search-products">Search Products</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case UserType.ZEPTO_APP_ADMIN:
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Invite Warehouse Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Invite warehouse administrators
                </p>
                <Button asChild className="w-full">
                  <Link to="/invite-warehouse-admin">Invite Admin</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  Create Warehouse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Set up new warehouse locations
                </p>
                <Button asChild className="w-full">
                  <Link to="/create-warehouse">Create Warehouse</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Register Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Add new products to inventory
                </p>
                <Button asChild className="w-full">
                  <Link to="/product-registration">Register Product</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Assign Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Assign products to warehouses
                </p>
                <Button asChild className="w-full">
                  <Link to="/assign-product">Assign Product</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case UserType.MAINT:
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse and search for products
                </p>
                <Button asChild className="w-full">
                  <Link to="/search-products">Search Products</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Invite App Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Invite application administrators
                </p>
                <Button asChild className="w-full">
                  <Link to="/invite-admin">Invite Admin</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Invite Warehouse Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Invite warehouse administrators
                </p>
                <Button asChild className="w-full">
                  <Link to="/invite-warehouse-admin">Invite Admin</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  Create Warehouse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Set up new warehouse locations
                </p>
                <Button asChild className="w-full">
                  <Link to="/create-warehouse">Create Warehouse</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Register Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Add new products to inventory
                </p>
                <Button asChild className="w-full">
                  <Link to="/product-registration">Register Product</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Assign Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Assign products to warehouses
                </p>
                <Button asChild className="w-full">
                  <Link to="/assign-product">Assign Product</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <p className="text-muted-foreground">
              No dashboard available for your user type.
            </p>
          </div>
        );
    }
  };

  const getDashboardTitle = () => {
    switch (user.userType) {
      case UserType.CONSUMER:
        return "Consumer Dashboard";
      case UserType.ZEPTO_APP_ADMIN:
        return "Admin Dashboard";
      case UserType.MAINT:
        return "Maintenance Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{getDashboardTitle()}</h1>
            <p className="text-muted-foreground">Welcome back, {user.userName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Dashboard;