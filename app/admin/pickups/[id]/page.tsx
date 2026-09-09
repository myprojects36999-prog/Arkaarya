import React from "react";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";
import { ArrowLeft, MapPin, Building, Phone, Mail, Box, Clock, ShieldAlert, FileText, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { UpdatePickupStatusModal } from "../UpdatePickupStatusModal";
import { PickupOperations } from "./PickupOperations";
import { PrintButton } from "./PrintButton";
import Link from "next/link";

export const revalidate = 0;

export default async function PickupDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient();
  
  const { data: pickup, error } = await supabase
    .from("pickup_requests")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !pickup) {
    console.error("Error fetching pickup details:", error);
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'assigned': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_transit': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'received': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 print:pb-0 print:bg-white print:text-black">
      
      {/* Print-Only Header */}
      <div className="hidden print:flex flex-col items-center justify-center border-b-2 border-[#00264A] pb-6 mb-8 text-center break-after-avoid">
        <img src="/ArkaAryaPvtLtd_Logo_v3.0.png" alt="ArkaArya" className="h-16 w-auto object-contain mb-4" />
        <h1 className="text-3xl font-serif font-bold text-[#00264A] uppercase tracking-wider">E-Waste Pickup Manifest</h1>
        <p className="text-sm font-semibold text-gray-500 mt-2">Document ID: {pickup.pickup_id} | Printed on: {new Date().toLocaleDateString('en-IN')}</p>

      </div>

      {/* Header & Breadcrumb */}
      <div className="flex items-center gap-4 print:hidden">
        <Link href="/admin/pickups" className="p-2 bg-white border border-[#E3E8E4] rounded-lg text-gray-500 hover:text-[#00264A] hover:bg-gray-50 transition-colors print:hidden">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#00264A]">Pickup #{pickup.pickup_id}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(pickup.status)}`}>
              {formatStatus(pickup.status || 'pending')}
            </span>
          </div>
          <p className="text-[#4A5568] text-sm mt-1">
            Created on {new Date(pickup.created_at).toLocaleString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        <div className="ml-auto flex gap-3 print:hidden">
          <PrintButton />
          <UpdatePickupStatusModal id={pickup.id} currentStatus={pickup.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6 print:space-y-0">
          
          {/* Client Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden print:shadow-none print:border-gray-300 print:rounded-none print:break-inside-avoid print:mb-8">
            <div className="px-6 py-4 border-b border-[#E3E8E4] bg-[#F8FAF7] print:bg-gray-100 print:border-gray-300">
              <h2 className="font-bold text-[#00264A] flex items-center gap-2">
                <Building size={18} className="text-[#629A13] print:text-[#00264A]" /> Client Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Company Name</p>
                <p className="font-semibold text-[#00264A]">{pickup.company_name || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Contact Person</p>
                <p className="font-semibold text-[#00264A]">{pickup.contact_person}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Phone size={14} /> Phone</p>
                <p className="font-semibold text-[#00264A]">{pickup.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Mail size={14} /> Email</p>
                <p className="font-semibold text-[#00264A]">{pickup.email}</p>
              </div>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden print:shadow-none print:border-gray-300 print:rounded-none print:break-inside-avoid print:mb-8">
            <div className="px-6 py-4 border-b border-[#E3E8E4] bg-[#F8FAF7] print:bg-gray-100 print:border-gray-300">
              <h2 className="font-bold text-[#00264A] flex items-center gap-2">
                <Box size={18} className="text-[#629A13] print:text-[#00264A]" /> Request Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pickup Type</p>
                  <p className="font-semibold text-[#00264A]">{pickup.pickup_type || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">What do they need?</p>
                  <p className="font-semibold text-[#00264A]">{pickup.need || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Condition</p>
                  <p className="font-semibold text-[#00264A]">{pickup.condition || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Weight/Quantity</p>
                  <p className="font-semibold text-[#00264A]">{pickup.estimated_weight || pickup.quantity || "Not specified"}</p>
                </div>
                {pickup.items && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Number of Items</p>
                    <p className="font-semibold text-[#00264A]">{pickup.items}</p>
                  </div>
                )}
                {pickup.data_destruction && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Data Destruction</p>
                    <p className="font-semibold text-[#00264A]">{pickup.data_destruction}</p>
                  </div>
                )}
              </div>

              {pickup.categories && pickup.categories.length > 0 && (
                <div className="pt-4 border-t border-[#E3E8E4] print:border-gray-300">
                  <p className="text-sm text-gray-500 mb-2">E-Waste Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {pickup.categories.map((cat: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#F8FAF7] border border-[#E3E8E4] rounded-lg text-sm text-[#00264A]">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-[#E3E8E4] print:border-gray-300">
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><MapPin size={14} /> Pickup Address</p>
                <p className="font-medium text-[#00264A] leading-relaxed">
                  {pickup.address}<br />
                  {pickup.city}, {pickup.state} {pickup.pincode}
                </p>
                {pickup.coordinates && (
                  <a 
                    href={`https://maps.google.com/?q=${pickup.coordinates.split(" (")[0].replace(" ", "")}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#629A13] hover:text-[#4d7a0f] transition-colors print:hidden"
                  >
                    📍 Use My Location (Google Maps)
                  </a>
                )}
              </div>

              {pickup.notes && (
                <div className="pt-4 border-t border-[#E3E8E4] print:border-gray-300">
                  <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FileText size={14} /> Additional Notes</p>
                  <div className="bg-gray-50 p-4 rounded-xl text-sm text-[#4A5568] print:bg-white print:border print:border-gray-300 print:rounded-none">
                    {pickup.notes}
                  </div>
                </div>
              )}

              {pickup.internal_notes && (
                <div className="pt-4 border-t border-[#E3E8E4] print:border-gray-300">
                  <p className="text-sm font-bold text-[#00264A] mb-2 flex items-center gap-1"><ShieldAlert size={14} className="text-[#629A13] print:text-[#00264A]" /> Internal & Status Notes</p>
                  <div className="bg-[#F8FAF7] border border-[#E3E8E4] p-4 rounded-xl text-sm text-[#4A5568] whitespace-pre-wrap font-mono print:bg-white print:border-gray-300 print:rounded-none">
                    {pickup.internal_notes}
                  </div>
                </div>
              )}

              {pickup.photos && pickup.photos.length > 0 && (
                <div className="pt-4 border-t border-[#E3E8E4] print:border-gray-300">
                  <p className="text-sm font-bold text-[#00264A] mb-2 flex items-center gap-1">
                    <ImageIcon size={14} className="text-[#629A13] print:text-[#00264A]" /> Uploaded Photos
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {pickup.photos.map((photo: string, index: number) => (
                      <a key={index} href={photo} target="_blank" rel="noopener noreferrer" className="block relative w-32 h-32 rounded-xl overflow-hidden border border-[#E3E8E4] hover:shadow-md transition-shadow">
                        <img src={photo} alt={`Pickup Photo ${index + 1}`} className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Actions */}
        <div className="space-y-6 print:space-y-0">
          
          {/* Scheduling */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] p-6 print:shadow-none print:border-gray-300 print:rounded-none print:break-inside-avoid print:mb-8">
            <h2 className="font-bold text-[#00264A] mb-4 flex items-center gap-2">
              <Clock size={18} className="text-[#629A13] print:text-[#00264A]" /> Scheduling
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Preferred Date</p>
                <p className="font-semibold text-[#00264A]">{pickup.preferred_date ? new Date(pickup.preferred_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : "Anytime"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Preferred Time</p>
                <p className="font-semibold text-[#00264A]">{pickup.preferred_time || "Business Hours"}</p>
              </div>
              {pickup.urgency && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Urgency</p>
                  <p className="font-semibold text-[#00264A]">{pickup.urgency}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="print:hidden">
            <PickupOperations id={pickup.id} currentStatus={pickup.status || 'pending'} />
          </div>

        </div>

      </div>
    </div>
  );
}
