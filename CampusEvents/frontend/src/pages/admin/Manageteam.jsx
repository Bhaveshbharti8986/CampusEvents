import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, UserPlus, AlertCircle, ArrowLeft, 
  Search, ShieldAlert, Plus, MoreVertical, UserMinus
} from 'lucide-react';

export default function ManageTeams() {
  const navigate = useNavigate();

  // Simulated Mock Data
  const [teams, setTeams] = useState([
    { id: 1, name: "Byte Me", capacity: 4, members: ["Alex Carter", "Sam Smith", "Jordan Lee", "Casey Jones"] },
    { id: 2, name: "Ctrl+Alt+Defeat", capacity: 4, members: ["Taylor Swift", "Chris Evans"] }, // Needs members!
    { id: 3, name: "Syntax Errors", capacity: 4, members: ["Morgan Freeman", "Emma Stone", "Ryan Reynolds"] },
  ]);

  const [unassignedStudents, setUnassignedStudents] = useState([
    "David Johnson", "Sophia Martinez", "Liam Brown", "Olivia Davis"
  ]);

  // Helper to determine if a team is incomplete (less than 3 members)
  const isIncomplete = (members, capacity) => members.length < capacity - 1; 

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-brand-accent transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Teams: CodeRed Hackathon</h1>
            <p className="text-text-muted">Group size: 3-4 members. Ensure no student is left behind.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white rounded-xl font-bold transition-all shadow-glow-primary">
            <Plus size={18} />
            Create New Group
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Registered Teams (Takes up 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Search and Filter */}
          <div className="glass-panel-Rounded p-4 flex gap-4">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-3 top-3 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search teams..." 
                className="w-full bg-bg-surface border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
            <select className="bg-bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-accent">
              <option value="all">All Teams</option>
              <option value="incomplete">Incomplete Only</option>
              <option value="full">Full Teams</option>
            </select>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map((team) => {
              const needsMembers = isIncomplete(team.members, team.capacity);
              
              return (
                <div 
                  key={team.id} 
                  className={`glass-panel p-6 rounded-2xl relative overflow-hidden transition-all ${
                    needsMembers ? 'border border-orange-500/50' : 'border border-white/10'
                  }`}
                >
                  {/* Warning glow for incomplete teams */}
                  {needsMembers && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>
                  )}

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {team.name}
                        {needsMembers && <AlertCircle size={16} className="text-orange-400" />}
                      </h3>
                      <p className="text-xs text-text-muted mt-1">
                        {team.members.length} / {team.capacity} Members
                      </p>
                    </div>
                    <button className="text-text-muted hover:text-white transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  {/* Member List */}
                  <ul className="space-y-3 mb-6 relative z-10">
                    {team.members.map((member, idx) => (
                      <li key={idx} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-accent font-bold text-xs uppercase border border-brand-accent/30">
                          {member.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-300">{member}</span>
                        <button className="ml-auto text-text-muted hover:text-red-400 transition-colors">
                           <UserMinus size={14} />
                        </button>
                      </li>
                    ))}
                    
                    {/* Empty Slots */}
                    {Array.from({ length: team.capacity - team.members.length }).map((_, idx) => (
                      <li key={`empty-${idx}`} className="flex items-center gap-3 border border-dashed border-gray-700 p-2 rounded-lg text-gray-500 bg-black/20">
                        <div className="w-8 h-8 rounded-full border border-dashed border-gray-600 flex items-center justify-center">
                           <UserPlus size={14} />
                        </div>
                        <span className="text-sm italic">Empty Slot</span>
                      </li>
                    ))}
                  </ul>

                  {needsMembers && (
                    <button className="w-full py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-bold rounded-lg transition-colors relative z-10">
                      Assign Student
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Unassigned Students (Takes up 1/3) */}
        <div className="lg:col-span-1">
          <div className="glass-panel-Rounded p-6 sticky top-28 border-t-4 border-t-brand-accent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users size={20} className="text-brand-accent" />
                Waiting Room
              </h2>
              <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white">
                {unassignedStudents.length} Left
              </span>
            </div>

            <p className="text-xs text-text-muted mb-4">
              These students registered but haven't joined or created a team yet.
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {unassignedStudents.map((student, idx) => (
                <div key={idx} className="bg-bg-surface border border-gray-700 p-3 rounded-xl flex items-center justify-between hover:border-brand-primary transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-text-muted group-hover:text-brand-accent transition-colors">
                      <ShieldAlert size={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-300">{student}</span>
                  </div>
                  
                  {/* Quick Assign Dropdown/Button */}
                  <button className="px-3 py-1 bg-white/5 hover:bg-brand-primary text-text-muted hover:text-white text-xs font-bold rounded transition-colors">
                    Assign
                  </button>
                </div>
              ))}
              
              {unassignedStudents.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <p>All students are assigned to a team!</p>
                </div>
              )}
            </div>
            
            <button className="w-full mt-6 py-3 border border-dashed border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-bg-deep font-bold rounded-xl transition-all">
              Auto-Group Remaining
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}