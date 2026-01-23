"use client"

import { AlertCircle, Settings, Bold, Italic, CheckCircle, Info, Plus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Toggle } from "@/components/ui/toggle"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

const coreColors = [
  { name: "Primary Accent", value: "#3b82f6", cssVar: "--chart-1" },
  { name: "Foreground", value: "#fafafa", cssVar: "--foreground" },
  { name: "Primary Foreground", value: "#0a0a0a", cssVar: "--primary-foreground" },
  { name: "Card", value: "#141414", cssVar: "--card" },
  { name: "Primary", value: "#fafafa", cssVar: "--primary" },
  { name: "Secondary", value: "#1f1f1f", cssVar: "--secondary" },
  { name: "Muted", value: "#262626", cssVar: "--muted" },
  { name: "Muted Foreground", value: "#a1a1a1", cssVar: "--muted-foreground" },
  { name: "Accent", value: "#1f1f1f", cssVar: "--accent" },
  { name: "Destructive", value: "#7f1d1d", cssVar: "--destructive" },
  { name: "Border", value: "#262626", cssVar: "--border" },
  { name: "Ring", value: "#525252", cssVar: "--ring" },
]

const chartColors = [
  { name: "Chart 1", value: "#3b82f6", cssVar: "--chart-1" },
  { name: "Chart 2", value: "#22c55e", cssVar: "--chart-2" },
  { name: "Chart 3", value: "#06b6d4", cssVar: "--chart-3" },
  { name: "Chart 4", value: "#eab308", cssVar: "--chart-4" },
  { name: "Chart 5", value: "#8b5cf6", cssVar: "--chart-5" },
]

const sidebarColors = [
  { name: "Sidebar", value: "#111111", cssVar: "--sidebar" },
]

const semanticColors = [
  { name: "Positive", textClass: "text-emerald-400", bgClass: "bg-emerald-500/20" },
  { name: "Negative", textClass: "text-red-400", bgClass: "bg-red-500/20" },
  { name: "Info", textClass: "text-blue-400", bgClass: "bg-blue-500/20" },
  { name: "Warning", textClass: "text-amber-400", bgClass: "bg-amber-500/20" },
]

const spacingScale = [
  { name: "gap-1.5", value: "6px" },
  { name: "gap-2", value: "8px" },
  { name: "gap-2.5", value: "10px" },
  { name: "gap-3", value: "12px" },
  { name: "gap-4", value: "16px" },
  { name: "gap-6", value: "24px" },
]

const radiusScale = [
  { name: "radius-sm", value: "4px" },
  { name: "radius-md", value: "6px" },
  { name: "radius-lg", value: "8px" },
  { name: "radius-xl", value: "12px" },
  { name: "container", value: "14px" },
]

function ColorSwatch({ name, value, cssVar }: { name: string; value: string; cssVar: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-lg border border-border shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
        <p className="text-xs text-muted-foreground font-mono truncate">{cssVar}</p>
      </div>
    </div>
  )
}

function SemanticSwatch({ name, textClass, bgClass }: { name: string; textClass: string; bgClass: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-lg border border-border shrink-0 ${bgClass}`} />
      <div>
        <p className={`text-sm font-medium ${textClass}`}>{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{textClass}</p>
      </div>
    </div>
  )
}

export default function DesignSystemPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen p-6 lg:p-10 space-y-8 max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Design System</h1>
          <p className="text-sm text-muted-foreground">Visual reference for the financial dashboard</p>
        </header>

        {/* Colors */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold">Colors</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Core palette, chart colors, and semantic colors</p>
          </div>

          <div className="space-y-4">
            {/* Core Colors */}
            <div className="dashboard-container p-4 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Core Colors</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {coreColors.map((color) => (
                  <ColorSwatch key={color.cssVar} {...color} />
                ))}
              </div>
            </div>

            {/* Chart Colors */}
            <div className="dashboard-container p-4 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Chart Colors</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {chartColors.map((color) => (
                  <ColorSwatch key={color.cssVar} {...color} />
                ))}
              </div>
            </div>

            {/* Sidebar Colors */}
            <div className="dashboard-container p-4 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Sidebar Colors</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sidebarColors.map((color) => (
                  <ColorSwatch key={color.cssVar} {...color} />
                ))}
              </div>
            </div>

            {/* Semantic Colors */}
            <div className="dashboard-container p-4 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Semantic Colors</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {semanticColors.map((color) => (
                  <SemanticSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold">Typography</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Font: Geist (sans), Geist Mono (mono)</p>
          </div>

          <div className="dashboard-container p-4 space-y-6">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">text-2xl font-semibold</p>
              <p className="text-2xl font-semibold">$2.4B AUM</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">text-xl font-semibold</p>
              <p className="text-xl font-semibold">12 Active Agents</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">text-sm font-semibold</p>
              <p className="text-sm font-semibold">Section Heading</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">text-sm text-foreground</p>
              <p className="text-sm text-foreground">Body text for content</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">text-sm text-muted-foreground</p>
              <p className="text-sm text-muted-foreground">Description and secondary text</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">text-xs text-muted-foreground</p>
              <p className="text-xs text-muted-foreground">Labels and captions</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">font-mono text-sm</p>
              <p className="font-mono text-sm">CODE_VALUE_123</p>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold">Spacing</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Gap and padding scale</p>
          </div>

          <div className="dashboard-container p-4 space-y-4">
            <div className="flex flex-wrap gap-6">
              {spacingScale.map((space) => (
                <div key={space.name} className="flex items-end gap-2">
                  <div
                    className="bg-chart-1 rounded"
                    style={{ width: space.value, height: "32px" }}
                  />
                  <div>
                    <p className="text-sm font-medium">{space.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{space.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold">Border Radius</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Rounded corner scale</p>
          </div>

          <div className="dashboard-container p-4">
            <div className="flex flex-wrap gap-6">
              {radiusScale.map((radius) => (
                <div key={radius.name} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 bg-secondary border border-border"
                    style={{ borderRadius: radius.value }}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">{radius.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{radius.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Container Classes */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold">Container Classes</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Dashboard-specific container styles</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">.dashboard-container</p>
              <div className="dashboard-container p-4 h-24 flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Standard</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">.dashboard-container-elevated</p>
              <div className="dashboard-container-elevated p-4 h-24 flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Elevated</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">.dashboard-container-flat</p>
              <div className="dashboard-container-flat p-4 h-24 flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Flat</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">.dashboard-container-nested</p>
              <div className="dashboard-container-nested p-4 h-24 flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Nested</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">.dashboard-container-header</p>
              <div className="dashboard-container-header p-4 h-24 flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Header</p>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold">Components</h2>
            <p className="text-xs text-muted-foreground mt-0.5">UI component library</p>
          </div>

          <Tabs defaultValue="buttons" className="space-y-4">
            <TabsList>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>

            <TabsContent value="buttons" className="space-y-4">
              {/* Primary Action Buttons */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Primary Action (used for CTAs)</p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-chart-1 text-white hover:bg-chart-1/90">
                    <Plus />
                    Create Agent
                  </Button>
                  <Button className="bg-chart-1 text-white hover:bg-chart-1/90">
                    Generate Report
                  </Button>
                  <Button className="bg-chart-1 text-white hover:bg-chart-1/90">
                    <Send />
                    Send
                  </Button>
                </div>
              </div>

              {/* Button Variants */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Button with Icons */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">With Icons</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="icon-sm"><Settings /></Button>
                  <Button size="icon"><Settings /></Button>
                  <Button size="icon-lg"><Settings /></Button>
                  <Button><Settings /> Settings</Button>
                </div>
              </div>

              {/* Button States */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">States</p>
                <div className="flex flex-wrap gap-3">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>

              {/* Toggle */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Toggle</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Toggle><Bold /></Toggle>
                  <Toggle variant="outline"><Italic /></Toggle>
                  <Toggle size="sm"><Bold /></Toggle>
                  <Toggle size="lg"><Bold /></Toggle>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="space-y-4">
              {/* Badge Variants */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              {/* Alerts */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Alerts</p>
                <div className="space-y-3">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>This is a default alert message.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Destructive Alert</AlertTitle>
                    <AlertDescription>This is an error alert message.</AlertDescription>
                  </Alert>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="forms" className="space-y-4">
              {/* Input */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Input</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Default</Label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Disabled</Label>
                    <Input placeholder="Disabled" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Invalid</Label>
                    <Input placeholder="Invalid" aria-invalid="true" />
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Textarea</p>
                <Textarea placeholder="Enter longer text..." />
              </div>

              {/* Checkbox & Switch */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Checkbox & Switch</p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox id="check1" />
                    <Label htmlFor="check1">Unchecked</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="check2" defaultChecked />
                    <Label htmlFor="check2">Checked</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="check3" disabled />
                    <Label htmlFor="check3">Disabled</Label>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center gap-2">
                    <Switch id="switch1" />
                    <Label htmlFor="switch1">Off</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="switch2" defaultChecked />
                    <Label htmlFor="switch2">On</Label>
                  </div>
                </div>
              </div>

              {/* Select */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Select</p>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Option 1</SelectItem>
                    <SelectItem value="2">Option 2</SelectItem>
                    <SelectItem value="3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Slider */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Slider</p>
                <div className="space-y-4 max-w-md">
                  <Slider defaultValue={[50]} />
                  <Slider defaultValue={[25, 75]} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4">
              {/* Card */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Card</p>
                <Card className="max-w-sm">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Card content goes here.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Table */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Table</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Item 1</TableCell>
                      <TableCell>$100</TableCell>
                      <TableCell><Badge variant="outline">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Item 2</TableCell>
                      <TableCell>$250</TableCell>
                      <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Progress */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Progress</p>
                <div className="space-y-3 max-w-md">
                  <Progress value={33} />
                  <Progress value={66} />
                  <Progress value={100} />
                </div>
              </div>

              {/* Skeleton */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Skeleton</p>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>

              {/* Avatar */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Avatar</p>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>XY</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="navigation" className="space-y-4">
              {/* Tabs (meta) */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Tabs</p>
                <Tabs defaultValue="tab1" className="max-w-md">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="p-4">Content for Tab 1</TabsContent>
                  <TabsContent value="tab2" className="p-4">Content for Tab 2</TabsContent>
                  <TabsContent value="tab3" className="p-4">Content for Tab 3</TabsContent>
                </Tabs>
              </div>

              {/* Accordion */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Accordion</p>
                <Accordion type="single" collapsible className="max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Section 1</AccordionTrigger>
                    <AccordionContent>Content for section 1</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Section 2</AccordionTrigger>
                    <AccordionContent>Content for section 2</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Tooltip */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Tooltip</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tooltip content</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Separator */}
              <div className="dashboard-container p-4 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Separator</p>
                <div className="space-y-4 max-w-md">
                  <p className="text-sm">Content above</p>
                  <Separator />
                  <p className="text-sm">Content below</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </TooltipProvider>
  )
}
