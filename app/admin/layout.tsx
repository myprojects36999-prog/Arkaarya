import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Briefcase, Truck, FileText, Settings, DollarSign, LogOut, Building2, HeartHandshake, Star, BarChart, ShieldCheck, Scale, Inbox } from "lucide-react";
import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If there's no session, it means they are on the login page (or middleware will redirect them)
  // We don't want to show the sidebar on the login page.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex relative">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[#E3E8E4] flex flex-col fixed inset-y-0 z-10 overflow-y-auto print:hidden">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 mb-8">
            <img src="/ArkaAryaPvtLtd_Logo_v3.0.png" alt="ArkaArya Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold text-[#00264A] ml-2">ArkaArya</span>
          </Link>

          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Users size={18} />
              Leads
            </Link>
            <Link href="/admin/pickups" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Truck size={18} />
              Pickups
            </Link>
            <Link href="/admin/inbox" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Inbox size={18} />
              Inbox (Contact)
            </Link>
            <Link href="/admin/finance" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <DollarSign size={18} />
              Finance
            </Link>
            <Link href="/admin/epr" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <ShieldCheck size={18} />
              EPR Inquiries
            </Link>
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Content</p>
            </div>
            <Link href="/admin/industries" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Building2 size={18} />
              Industries
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <LayoutDashboard size={18} />
              Services
            </Link>
            <Link href="/admin/legal" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Scale size={18} />
              Legal & Compliance
            </Link>
            <Link href="/admin/case-studies" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <FileText size={18} />
              Case Studies
            </Link>
            <Link href="/admin/social-activities" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <HeartHandshake size={18} />
              Social Activities
            </Link>
            <Link href="/admin/endorsements" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Star size={18} />
              Endorsements
            </Link>
            <Link href="/admin/impact-dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <BarChart size={18} />
              Impact Dashboard
            </Link>
            <Link href="/admin/careers" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Briefcase size={18} />
              Careers
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-[#E3E8E4]">
          <nav className="space-y-1">
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Settings size={18} />
              Settings
            </Link>
            <Link href="/admin/team" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F8FAF7] hover:text-[#00264A] transition-colors">
              <Users size={18} />
              Team Management
            </Link>
            <form action="/auth/signout" method="post">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut size={18} />
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 print:ml-0 print:p-4">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
