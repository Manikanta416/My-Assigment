import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, Users, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Mock data for recent sales
interface Sale {
  id: number;
  name: string;
  email: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  date: string;
}

const recentSales: Sale[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    amount: 350,
    status: "success",
    date: "Just now"
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    amount: 240,
    status: "processing",
    date: "2 minutes ago"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    amount: 499,
    status: "success",
    date: "5 hours ago"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    amount: 129,
    status: "failed",
    date: "Yesterday"
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james@example.com",
    amount: 750,
    status: "success",
    date: "Yesterday"
  }
];

// Status badges
function StatusBadge({ status }: { status: Sale["status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn("capitalize", {
        "border-green-600 bg-green-100 text-green-700": status === "success",
        "border-yellow-600 bg-yellow-100 text-yellow-700": status === "processing",
        "border-red-600 bg-red-100 text-red-700": status === "failed",
        "border-gray-600 bg-gray-100 text-gray-700": status === "pending",
      })}
    >
      {status}
    </Badge>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your store performance.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+20.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">+16.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-rose-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />
                  <span className="text-rose-500">-8.4%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Chart Card */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Sales performance for current period vs previous period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would render here</p>
                  <p className="text-sm">Using recharts or other supported library</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sales */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentSales.slice(0, 5).map((sale) => (
                    <div key={sale.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{sale.name}</p>
                        <p className="text-sm text-muted-foreground">{sale.email}</p>
                      </div>
                      <div className="ml-auto font-medium">
                        +${sale.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Showing recent orders across your stores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{sale.name}</div>
                            <div className="text-sm text-muted-foreground">{sale.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${sale.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <StatusBadge status={sale.status} />
                      </TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="h-[600px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Analytics Content</h3>
            <p className="text-muted-foreground">This tab would contain analytics charts and data.</p>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="h-[600px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Reports Content</h3>
            <p className="text-muted-foreground">This tab would contain downloadable reports and summaries.</p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="h-[600px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Settings Content</h3>
            <p className="text-muted-foreground">This tab would contain user and dashboard settings.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}