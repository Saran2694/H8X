import React, { useState } from 'react';

export default function ProfileScene({ 
  userProfile = {}, 
  setUserProfile = () => {},
  credits = 325,
  onSignInClick = () => {}
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name || 'SRI SARAN');
  const [email, setEmail] = useState(userProfile.email || 'sri.saran@h8x-universe.io');
  const [phone, setPhone] = useState(userProfile.phone || '+91 98765 43210');
  const [avatar, setAvatar] = useState(userProfile.avatar || '/img/ch1.png');
  const [friendInput, setFriendInput] = useState('');

  const [friendsList, setFriendsList] = useState([
    { id: 'HX-9921', name: 'ALEX VANCE', status: 'ONLINE', level: 14, avatar: '/img/ch2.png' },
    { id: 'HX-4412', name: 'KAITO SHIN', status: 'IN GAME (TURF)', level: 18, avatar: '/img/ch3.png' },
    { id: 'HX-7720', name: 'ELENA ROSTOVA', status: 'OFFLINE', level: 9, avatar: '/img/ch4.png' }
  ]);

  const handleSaveDetails = () => {
    setIsEditing(false);
    setUserProfile({
      ...userProfile,
      name,
      email,
      phone,
      avatar
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
      setUserProfile({ ...userProfile, avatar: url });
    }
  };

  const handleAddFriend = () => {
    if (!friendInput.trim()) return;
    setFriendsList([
      ...friendsList,
      {
        id: `HX-${Math.floor(1000 + Math.random() * 9000)}`,
        name: friendInput.toUpperCase(),
        status: 'ONLINE',
        level: Math.floor(Math.random() * 15) + 1,
        avatar: '/img/ch5.png'
      }
    ]);
    setFriendInput('');
  };

  const userId = userProfile.id || 'HX-000184';
  const visits = userProfile.totalVisits || 12;
  const level = userProfile.level || 12;
  const userCredits = userProfile.credits !== undefined ? userProfile.credits : credits;

  const achievements = [
    { title: 'FIRST VISIT', desc: 'Completed first H8X experience session' },
    { title: 'AQUA MASTER', desc: 'Completed 5 swimming sessions' },
    { title: 'TACTICAL ACE', desc: 'Won a tournament match at Virtual Rigs' }
  ];

  return (
    <section id="profile" className="relative w-full min-h-screen bg-[#07080c] text-white pt-24 pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* BACKGROUND GRAPHIC */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ff1e38_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="font-mono text-xs text-[#ff1e38] tracking-[0.3em] uppercase font-bold block mb-1">
              PROFILE & COMMUNITY // SYSTEM DOSSIER
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase text-white">
              USER PROFILE
            </h2>
          </div>

          <button
            onClick={onSignInClick}
            className="px-6 py-2 text-xs font-black tracking-widest uppercase text-white border border-white/20 bg-black/60 rounded hover:border-[#ff1e38] transition-colors"
          >
            SIGN IN / SWITCH ACCOUNT
          </button>
        </div>

        {/* PROFILE MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: AVATAR & QUICK DATA (4 COLS) */}
          <div className="lg:col-span-4 bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-6 flex flex-col items-center text-center">
            
            {/* AVATAR DISPLAY & UPLOAD */}
            <div className="relative group w-44 h-44 rounded-full overflow-hidden border-2 border-[#ff1e38] shadow-[0_0_20px_rgba(255,30,56,0.4)]">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/img/ch1.png'; }}
              />
              <label className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-mono font-bold tracking-wider text-white">
                <span>CHANGE IMAGE</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            {/* NAME & ID */}
            <div>
              <h3 className="font-editorial text-2xl font-black uppercase text-white">{name}</h3>
              <p className="font-mono text-xs text-[#ff1e38] font-bold tracking-widest mt-0.5">{userId}</p>
            </div>

            {/* KEY METRICS */}
            <div className="w-full grid grid-cols-3 gap-2 border-t border-b border-white/10 py-4 font-mono">
              <div>
                <span className="text-[9px] text-gray-400 block tracking-widest uppercase">VISITS</span>
                <span className="text-lg font-black text-white">{visits}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 block tracking-widest uppercase">CREDITS</span>
                <span className="text-lg font-black text-[#ff1e38]">{userCredits}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 block tracking-widest uppercase">LEVEL</span>
                <span className="text-lg font-black text-white">{level}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: DETAILS & EDIT (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* USER INFORMATION EDITABLE FORM */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h4 className="font-editorial text-xl font-bold uppercase text-white">USER INFORMATION</h4>
                {isEditing ? (
                  <button
                    onClick={handleSaveDetails}
                    className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-white bg-[#ff1e38] rounded hover:bg-[#b30018] transition-colors"
                  >
                    SAVE DETAILS
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-gray-300 border border-white/20 rounded hover:text-white hover:border-white transition-colors"
                  >
                    EDIT PROFILE
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
                <div>
                  <label className="text-gray-400 block tracking-widest uppercase mb-1">USER NAME</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/80 border border-white/20 rounded p-2 text-white font-bold"
                    />
                  ) : (
                    <div className="font-bold text-white text-sm py-1">{name}</div>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 block tracking-widest uppercase mb-1">USER ID</label>
                  <div className="font-bold text-[#ff1e38] text-sm py-1">{userId}</div>
                </div>

                <div>
                  <label className="text-gray-400 block tracking-widest uppercase mb-1">EMAIL ADDRESS</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/80 border border-white/20 rounded p-2 text-white font-bold"
                    />
                  ) : (
                    <div className="font-bold text-white text-sm py-1">{email}</div>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 block tracking-widest uppercase mb-1">PHONE NUMBER</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/80 border border-white/20 rounded p-2 text-white font-bold"
                    />
                  ) : (
                    <div className="font-bold text-white text-sm py-1">{phone}</div>
                  )}
                </div>
              </div>
            </div>

            {/* ACHIEVEMENTS BLOCK */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-4">
              <h4 className="font-editorial text-xl font-bold uppercase text-white border-b border-white/10 pb-4">
                UNLOCKED ACHIEVEMENTS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {achievements.map((ach) => (
                  <div key={ach.title} className="p-4 bg-black/40 border border-white/10 rounded-lg space-y-1">
                    <div className="font-editorial text-sm font-black text-[#ff1e38] uppercase tracking-wider">{ach.title}</div>
                    <div className="font-sans text-[11px] text-gray-400">{ach.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMUNITY & FRIENDS FEATURES */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <h4 className="font-editorial text-xl font-bold uppercase text-white">COMMUNITY & FRIENDS</h4>
                  <p className="font-sans text-xs text-gray-400">Connect profiles and squad up for multi-player turf & VR matches.</p>
                </div>

                {/* ADD FRIEND INPUT */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ENTER FRIEND NAME..."
                    value={friendInput}
                    onChange={(e) => setFriendInput(e.target.value)}
                    className="bg-black/80 border border-white/20 rounded px-3 py-1.5 text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#ff1e38]"
                  />
                  <button
                    onClick={handleAddFriend}
                    className="px-4 py-1.5 text-xs font-bold uppercase text-white bg-[#ff1e38] rounded hover:bg-[#b30018] transition-colors"
                  >
                    ADD FRIEND
                  </button>
                </div>
              </div>

              {/* FRIENDS LIST */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {friendsList.map((fr) => (
                  <div key={fr.id} className="p-4 bg-black/40 border border-white/10 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                      <img src={fr.avatar} alt={fr.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-editorial text-xs font-black text-white truncate">{fr.name}</div>
                      <div className="font-mono text-[9px] text-gray-400">{fr.id} • LVL {fr.level}</div>
                      <div className="font-mono text-[9px] text-[#ff1e38] font-bold mt-0.5">{fr.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}