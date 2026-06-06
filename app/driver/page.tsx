"use client";
import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Navigation, Star, Zap, DollarSign, Truck } from "lucide-react";

const mockJobs = [
  { id: "TMT-101", loadType: "Medical & Lab", icon: "🏥", pickup: "CityMed Diagnostics", dropoff: "UCLA Medical Center", distance: "0.8 mi", pay: 86.56, urgency: "ASAP", estTime: "25 min", badge: "badge-urgent" },
  { id: "TMT-102", loadType: "Legal & Court", icon: "⚖️", pickup: "Steele & Associates", dropoff: "LA Superior Court", distance: "2.3 mi", pay: 67.25, urgency: "TODAY", estTime: "35 min", badge: "badge-today" },
  { id: "TMT-103", loadType: "Hotel & Hospitality", icon: "🏨", pickup: "Hilton Downtown", dropoff: "LAX Terminal 4", distance: "4.1 mi", pay: 66.25, urgency: "SCHEDULED", estTime: "45 min", badge: "badge-scheduled" },
];

export default function DriverDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [acceptedJob, setAcceptedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState(mockJobs);

  const handleAccept = (id: string) => {
    setAcceptedJob(id);
    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
  };
  const handlePass = (id: string) => {
    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
  };

  const activeJob = mockJobs.find((job) => job.id === acceptedJob);

  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Availability Toggle */}
          <div className={`rounded-2xl p-6 mb-6 text-center border-2 transition-all ${isOnline ? "border-brand-success bg-brand-success/10" : "border-white/20 bg-brand-slate"}`}>
            <button onClick={() => setIsOnline(!isOnline)} className="w-full">
              <div className={`inline-flex items-center gap-4 px-8 py-4 rounded-2xl transition-all ${isOnline ? "bg-brand-success text-white" : "bg-brand-slate text-white/50"}`}>
                <div className={`w-6 h-6 rounded-full border-2 ${isOnline ? "bg-white border-white" : "border-white/30"}`} />
                <div className="text-left">
                  <p className="font-black text-2xl">You are {isOnline ? "ONLINE" : "OFFLINE"}</p>
                  <p className="text-sm opacity-70">{isOnline ? "Receiving new job requests" : "Tap to go online"}</p>
                </div>
              </div>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "Today's Earnings", value: "$187.50", icon: DollarSign },
              { label: "Jobs Today", value: "3", icon: Truck },
              { label: "Rating", value: "4.9 ⭐", icon: Star },
              { label: "Miles Today", value: "28 mi", icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="card-dark text-center p-3">
                <p className="text-white font-black text-base">{stat.value}</p>
                <p className="text-white/40 text-xs mt-1 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* AI Alert */}
          {isOnline && jobs.length > 0 && (
            <div className="bg-brand-amber/10 border border-brand-amber/40 rounded-xl p-4 mb-6 flex items-center gap-3">
              <Zap size={20} className="text-brand-amber flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white font-bold text-sm">🤖 Urgent job {jobs[0].distance} away — {formatCurrency(jobs[0].pay)}</p>
                <p className="text-white/50 text-xs">AI matched you as the closest verified driver</p>
              </div>
              <button onClick={() => handleAccept(jobs[0].id)} className="bg-brand-amber text-brand-navy text-xs font-black py-2 px-3 rounded-lg flex-shrink-0">Accept</button>
            </div>
          )}

          {/* Active Job */}
          {activeJob && (
            <div className="card-dark border-brand-success/40 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-success rounded-full animate-pulse" />
                  <span className="text-brand-success font-bold text-sm uppercase tracking-wide">Active Job</span>
                </div>
                <span className="badge-today">{activeJob.id}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{activeJob.icon} {activeJob.loadType}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 text-sm">↑ Pickup:</span>
                  <span className="text-white/70 text-sm">{activeJob.pickup}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-brand-amber text-sm">↓ Dropoff:</span>
                  <span className="text-white/70 text-sm">{activeJob.dropoff}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-brand-amber font-black text-xl">{formatCurrency(activeJob.pay * 0.8)}</span>
                <span className="text-white/50 text-sm">Your Payout</span>
              </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeJob.pickup)}`} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center gap-2">
                <Navigation size={18} />
                Navigate to Pickup
              </a>
            </div>
          )}

          {/* Job Feed */}
          {isOnline && (
            <div>
              <h2 className="text-white font-bold text-lg mb-4">Available Jobs Nearby</h2>
              {jobs.length === 0 ? (
                <div className="card-dark text-center py-12">
                  <Truck size={48} className="text-white/20 mx-auto mb-3" />
                  <p className="text-white/50">No jobs available right now. Stay online to receive new requests!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="card-dark">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{job.icon}</span>
                          <div>
                            <h3 className="text-white font-bold">{job.loadType}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={job.badge}>{job.urgency}</span>
                              <span className="text-white/40 text-xs">{job.distance} away</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-brand-amber font-black text-xl">{formatCurrency(job.pay * 0.8)}</p>
                          <p className="text-white/40 text-xs">Your payout</p>
                        </div>
                      </div>
                      <div className="space-y-1 mb-4">
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-green-400">↑</span>
                          <span className="text-white/70">{job.pickup}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-brand-amber">↓</span>
                          <span className="text-white/70">{job.dropoff}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/40 text-xs">Est. {job.estTime}</span>
                        <span className="text-white/40 text-xs">{job.id}</span>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => handlePass(job.id)} className="flex-1 border border-white/20 text-white/60 py-2 rounded-lg text-sm hover:border-white/40 transition-colors">Pass</button>
                        <button onClick={() => handleAccept(job.id)} className="flex-1 btn-primary py-2 text-sm">Accept Job</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isOnline && (
            <div className="card-dark text-center py-12">
              <div className="text-5xl mb-4">🚫</div>
              <h3 className="text-white font-bold text-xl mb-2">You&apos;re Offline</h3>
              <p className="text-white/50">Go online to start receiving job requests</p>
              <button onClick={() => setIsOnline(true)} className="btn-primary mt-6">Go Online</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
