import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudUpload, File, Image as ImageIcon, FileText, Music, Video, Copy, Check, MoreVertical, Trash2, Shield, HardDrive, Download, Search } from 'lucide-react';

const RECENT_FILES = [
    { id: 1, name: "Project_Proposal.pdf", size: "2.4 MB", type: "pdf", date: "2 mins ago" },
    { id: 2, name: "Office_Deck_2024.pptx", size: "12.8 MB", type: "doc", date: "1 hour ago" },
    { id: 3, name: "Hero_Background.png", size: "4.1 MB", type: "image", date: "Yesterday" },
    { id: 4, name: "Theme_Song_v2.mp3", size: "8.5 MB", type: "audio", date: "2 days ago" },
];

function App() {
    const [isUploading, setIsUploading] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            alert('File uploaded successfully! (Mock Demo)');
        }, 2000);
    };

    const copyLink = (id: number) => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                            <CloudUpload className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight uppercase">Cloud<span className="text-blue-600">Drive</span></h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">MK Global File Hub</p>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-12">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search files, folders..."
                                className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-xs font-black uppercase tracking-widest">Premium Plan</span>
                            <span className="text-[10px] font-bold text-success-500 text-blue-500 uppercase">82% Storage Used</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-12 max-w-7xl mx-auto px-6 w-full flex-1 gap-10 flex flex-col lg:flex-row">
                {/* Left Column: Upload & Stats */}
                <div className="w-full lg:w-96 space-y-6">
                    <div className="glass-card rounded-[3rem] p-10">
                        <h2 className="text-xl font-black mb-8 uppercase tracking-tight">Upload Center</h2>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="upload-zone group"
                        >
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} />

                            <AnimatePresence mode="wait">
                                {isUploading ? (
                                    <motion.div
                                        key="uploading"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
                                        <p className="text-sm font-black uppercase tracking-widest text-blue-600">Syncing...</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                            <CloudUpload className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-sm font-black uppercase mb-2">Drop your files here</h3>
                                        <p className="text-xs font-medium text-slate-400">Max size 500MB • PDF, JPG, PNG</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={handleUpload}
                            className="w-full mt-6 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-600/20 uppercase text-xs tracking-widest active:scale-95"
                        >
                            Select Files
                        </button>
                    </div>

                    <div className="glass-card rounded-[3rem] p-10 bg-blue-600 text-white border-transparent">
                        <div className="flex items-center gap-3 mb-6">
                            <HardDrive className="w-6 h-6" />
                            <h3 className="text-lg font-black uppercase tracking-tight">Cloud Stats</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 opacity-80">
                                    <span>12.4 GB / 15 GB</span>
                                    <span>82%</span>
                                </div>
                                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '82%' }}
                                        className="h-full bg-white"
                                    />
                                </div>
                            </div>
                            <p className="text-xs font-medium opacity-70 leading-relaxed">
                                Your storage is almost full. Upgrade to Pro for unlimited space and prioritized bandwidth.
                            </p>
                            <button className="w-full py-4 bg-white text-blue-600 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-blue-50 transition-colors">
                                UPGRADE NOW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: File Grid */}
                <div className="flex-1 space-y-8">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Recent <span className="text-slate-300">Uploads</span></h2>
                            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Managing your digital assets</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm"><MoreVertical className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {RECENT_FILES.map((file, idx) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card rounded-[2.5rem] p-6 group hover:shadow-indigo-500/10 transition-all"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getFileColor(file.type)}`}>
                                        {getFileIcon(file.type)}
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => copyLink(file.id)}
                                            className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-500 transition-all"
                                        >
                                            {copiedId === file.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-black text-sm uppercase truncate">{file.name}</h3>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>{file.size}</span>
                                        <span>{file.date}</span>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 border border-slate-100 hover:bg-slate-50 text-slate-600 font-black rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                    <Download className="w-3 h-3" /> Download
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Security Banner */}
                    <div className="p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 border border-white/5">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                            <Shield className="w-8 h-8" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-xl font-black uppercase tracking-tight">Bank-Grade Protection</h4>
                            <p className="text-slate-400 text-sm font-medium mt-1">
                                Every byte you upload is encrypted and distributed across 20+ global nodes for maximum durability and security.
                            </p>
                        </div>
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                            Review Security
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-10 border-t border-slate-200 bg-white text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2024 MK_CLOUD_STORAGE • 16/30 DONE</p>
            </footer>
        </div>
    );
}

function getFileIcon(type: string) {
    switch (type) {
        case 'pdf': return <FileText className="w-7 h-7" />;
        case 'image': return <ImageIcon className="w-7 h-7" />;
        case 'audio': return <Music className="w-7 h-7" />;
        case 'video': return <Video className="w-7 h-7" />;
        default: return <File className="w-7 h-7" />;
    }
}

function getFileColor(type: string) {
    switch (type) {
        case 'pdf': return 'bg-rose-50 text-rose-500';
        case 'image': return 'bg-emerald-50 text-emerald-500';
        case 'audio': return 'bg-amber-50 text-amber-500';
        case 'video': return 'bg-indigo-50 text-indigo-500';
        default: return 'bg-slate-50 text-slate-500';
    }
}

export default App;
