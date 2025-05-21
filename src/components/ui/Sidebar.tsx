import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
// import './Sidebar.css';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  Menu,
  Inbox,
  LineChart,
  CreditCard,
  Package,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type SidebarProps = {
  className?: string;
};

const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    icon: Home,
    href: "#",
    variant: "default",
    notifications: 0
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "#",
    variant: "ghost",
    notifications: 0
  },
  {
    title: "Customers",
    icon: Users,
    href: "#",
    variant: "ghost",
    notifications: 0
  },
  {
    title: "Orders",
    icon: Package,
    href: "#",
    variant: "ghost",
    notifications: 5
  },
  {
    title: "Transactions",
    icon: CreditCard,
    href: "#",
    variant: "ghost",
    notifications: 0
  },
  {
    title: "Messages",
    icon: Inbox,
    href: "#",
    variant: "ghost",
    notifications: 12
  },
  {
    title: "Reports",
    icon: LineChart,
    href: "#",
    variant: "ghost",
    notifications: 0
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
    variant: "ghost",
    notifications: 0
  }
];

export default function Sidebar({ className }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn("h-full max-h-screen", className)}
    >
      <ResizablePanel
        defaultSize={20}
        collapsible={true}
        minSize={isMobile ? 0 : 5}
        maxSize={20}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className={cn(
          "bg-background transition-all duration-300 ease-in-out",
          isCollapsed ? "min-w-0" : "min-w-[240px]"
        )}
      >
        <div className={cn("flex h-full flex-col p-4", isCollapsed && "items-center")}>
          <div className="flex items-center justify-between px-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  RA
                </div>
                <h2 className="text-lg font-semibold">My Assignment</h2>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
          <Separator className="my-4" />
          {!isCollapsed && (
            <div className="mb-4 px-2">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
              </div>
            </div>
          )}
          <div className="flex-1 overflow-auto">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
              {SIDEBAR_ITEMS.map((item, index) => (
                <Button
                  key={index}
                  variant={item.variant as "default" | "ghost"}
                  size={isCollapsed ? "icon" : "default"}
                  className={cn(
                    "justify-start",
                    isCollapsed && "h-12 w-12"
                  )}
                  asChild
                >
                  <a href={item.href} className="flex items-center gap-2">
                    <item.icon className={cn("h-4 w-4", item.variant === "default" && "text-primary-foreground")} />
                    {!isCollapsed && <span>{item.title}</span>}
                    {!isCollapsed && item.notifications > 0 && (
                      <Badge className="ml-auto bg-primary text-xs" variant="default">
                        {item.notifications}
                      </Badge>
                    )}
                  </a>
                </Button>
              ))}
            </nav>
          </div>
          <Separator className="my-4" />
          <div className="px-2">
            {!isCollapsed ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">User Admin</span>
                  <span className="text-xs text-muted-foreground">admin@example.com</span>
                </div>
                <Button size="icon" variant="ghost" className="ml-auto">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </div>
            ) : (
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>UA</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
    </ResizablePanelGroup>
  );
}