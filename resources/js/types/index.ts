// ============================================================
// LIRIAS — Global Type Definitions
// Prepared for future backend integration (NestJS / Laravel)
// ============================================================

// ─── Server / VPS ───────────────────────────────────────────

export type ServerStatus =
    | 'running'
    | 'stopped'
    | 'rebooting'
    | 'provisioning'
    | 'error';
export type OSType = 'linux' | 'windows';
export type VirtualizationType = 'kvm' | 'lxc' | 'openvz';

export interface ServerDTO {
    id: string;
    name: string;
    hostname: string;
    status: ServerStatus;
    os: string;
    osType: OSType;
    ipv4: string;
    ipv6?: string;
    datacenter: string;
    plan: string;
    cpu: number;
    ram: number;
    disk: number;
    bandwidth: number;
    createdAt: string;
    expiresAt?: string;
}

export interface ServerMetricsDTO {
    serverId: string;
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
    networkIn: number;
    networkOut: number;
    uptime: number;
    timestamp: string;
}

// ─── Pricing / Plans ────────────────────────────────────────

export type BillingCycle = 'monthly' | 'yearly';
export type PlanCategory = 'vps-linux' | 'vps-windows' | 'cloud' | 'dedicated';

export interface PlanFeature {
    label: string;
    included: boolean;
    highlight?: boolean;
}

export interface PlanDTO {
    id: string;
    name: string;
    category: PlanCategory;
    vcpu: number;
    ram: number;
    disk: number;
    bandwidth: number;
    priceMonthly: number;
    priceYearly: number;
    popular?: boolean;
    features: PlanFeature[];
    osOptions: OSType[];
}

// ─── Datacenters ─────────────────────────────────────────────

export type DatacenterStatus =
    | 'operational'
    | 'degraded'
    | 'maintenance'
    | 'incident';

export interface DatacenterDTO {
    id: string;
    name: string;
    city: string;
    country: string;
    countryCode: string;
    flag: string;
    region:
        | 'south-america'
        | 'north-america'
        | 'europe'
        | 'asia'
        | 'oceania'
        | 'middle-east';
    status: DatacenterStatus;
    latency?: number;
    capacity: 'available' | 'limited' | 'full';
    features: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
}

// ─── Auth ────────────────────────────────────────────────────

export interface LoginDTO {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    acceptTerms: boolean;
}

export interface AuthTokenDTO {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
    plan: string;
    createdAt: string;
    twoFactorEnabled: boolean;
}

// ─── Billing ─────────────────────────────────────────────────

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'pix' | 'boleto' | 'paypal';

export interface InvoiceDTO {
    id: string;
    amount: number;
    currency: string;
    status: InvoiceStatus;
    dueDate: string;
    paidAt?: string;
    items: InvoiceItemDTO[];
}

export interface InvoiceItemDTO {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface PaymentMethodDTO {
    id: string;
    type: PaymentMethod;
    lastFour?: string;
    brand?: string;
    expiryDate?: string;
    isDefault: boolean;
}

// ─── Support ─────────────────────────────────────────────────

export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TicketDTO {
    id: string;
    subject: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: string;
    updatedAt: string;
    messages: TicketMessageDTO[];
}

export interface TicketMessageDTO {
    id: string;
    author: string;
    content: string;
    createdAt: string;
    isStaff: boolean;
}

// ─── API Response ────────────────────────────────────────────

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    code: string;
    statusCode: number;
    details?: Record<string, string[]>;
}

// ─── UI / Component Types ────────────────────────────────────

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'outline'
    | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeVariant =
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
    badge?: string;
    icon?: string;
}

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface TableColumn<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface FilterOption {
    label: string;
    value: string;
    count?: number;
}

export interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}
