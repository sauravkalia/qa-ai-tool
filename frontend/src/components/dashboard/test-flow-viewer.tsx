
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface TestFlowViewerProps {
  videoId: string;
}

// Mock data for test steps
const mockTestSteps = [
  { id: 1, description: "Navigate to login page", timestamp: "0:05" },
  { id: 2, description: "Enter username 'testuser'", timestamp: "0:12" },
  { id: 3, description: "Enter password '********'", timestamp: "0:18" },
  { id: 4, description: "Click login button", timestamp: "0:24" },
  { id: 5, description: "Verify dashboard is displayed", timestamp: "0:30" },
  { id: 6, description: "Click on the 'Products' menu", timestamp: "0:38" },
  { id: 7, description: "Verify product list is displayed", timestamp: "0:45" },
  { id: 8, description: "Filter products by category 'Electronics'", timestamp: "0:53" },
  { id: 9, description: "Click on the first product in the list", timestamp: "1:02" },
  { id: 10, description: "Verify product details page is displayed", timestamp: "1:10" },
];

// Mock code for test script
const mockTestScript = `import { test, expect } from '@playwright/test';

test('E2E Test Flow', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://example.com/login');
  
  // Enter username and password
  await page.fill('#username', 'testuser');
  await page.fill('#password', '********');
  
  // Click login button
  await page.click('#login-btn');
  
  // Verify dashboard is displayed
  await expect(page.locator('.dashboard-title')).toBeVisible();
  
  // Click on the 'Products' menu
  await page.click('text=Products');
  
  // Verify product list is displayed
  await expect(page.locator('.product-list')).toBeVisible();
  
  // Filter products by category 'Electronics'
  await page.selectOption('.category-filter', 'Electronics');
  
  // Click on the first product in the list
  await page.click('.product-item:first-child');
  
  // Verify product details page is displayed
  await expect(page.locator('.product-details')).toBeVisible();
});`;

export function TestFlowViewer({ videoId }: TestFlowViewerProps) {
  const [activeTab, setActiveTab] = useState("steps");

  const handleDownload = () => {
    // In a real app, this would download the actual script
    const blob = new Blob([mockTestScript], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-script.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Test script downloaded');
  };

  return (
    <div className="flex flex-col h-[600px]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <div className="px-6 border-b">
          <TabsList className="w-full justify-start h-12 p-0 bg-transparent">
            <TabsTrigger 
              value="steps" 
              className="data-[state=active]:bg-secondary/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2"
            >
              Test Steps
            </TabsTrigger>
            <TabsTrigger 
              value="script" 
              className="data-[state=active]:bg-secondary/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2"
            >
              Playwright Script
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="steps" className="flex-1 m-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="flex flex-col gap-3">
                {mockTestSteps.map((step) => (
                  <div 
                    key={step.id} 
                    className="flex items-start p-3 border rounded-lg glass-hover"
                  >
                    <div className="h-6 w-6 mr-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{step.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground ml-4 mt-0.5">
                      {step.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="script" className="flex-1 m-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="rounded-lg overflow-hidden border">
                <pre className="p-4 overflow-x-auto text-sm bg-secondary/30 dark:bg-secondary/10">
                  <code>{mockTestScript}</code>
                </pre>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="p-6 pt-2 border-t sticky bottom-0 bg-background/80 backdrop-blur-sm">
        <Button onClick={handleDownload} className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Download Test Script
        </Button>
      </div>
    </div>
  );
}
