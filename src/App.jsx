/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-white/10 p-6 bg-[#0a0a0a] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#00ff00] p-2 brutalist-border">
              <Gamepad2 className="text-black w-8 h-8" />
            </div>
            <h1 className="font-display text-4xl tracking-tighter uppercase italic">
              Visca<span className="text-[#00ff00]">Barca</span>
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151515] border-2 border-white/20 p-3 pl-12 font-mono text-sm focus:border-[#00ff00] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 max-w-7xl mx-auto w-full">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <motion.div
                layout
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="brutalist-card brutalist-border group cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedGame(game)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#00ff00] text-black font-display px-4 py-2 uppercase text-lg">Play Now</span>
                  </div>
                </div>
                <div className="p-5 flex-grow border-t-2 border-white/10">
                  <h3 className="font-display text-2xl uppercase mb-2 group-hover:text-[#00ff00] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-white/60 text-sm font-mono line-clamp-2">
                    {game.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-white/20 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="font-display text-3xl uppercase">No games found</h2>
            <p className="text-white/40 font-mono mt-2">Try searching for something else</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-white/10 p-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
          <p>© 2026 ViscaBarca Unblocked. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#00ff00]">Privacy</a>
            <a href="#" className="hover:text-[#00ff00]">Terms</a>
            <a href="#" className="hover:text-[#00ff00]">Contact</a>
          </div>
        </div>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-[#0a0a0a] brutalist-border w-full max-w-6xl flex flex-col overflow-hidden ${isFullScreen ? 'h-full' : 'max-h-[90vh]'}`}
            >
              {/* Modal Header */}
              <div className="p-4 border-b-2 border-white/10 flex justify-between items-center bg-[#151515]">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-2xl uppercase tracking-tight">{selectedGame.title}</h2>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
                    <Info className="w-3 h-3 text-[#00ff00]" />
                    <span className="text-[10px] font-mono text-white/60 uppercase">Unblocked</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullScreen}
                    className="p-2 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a
                    href={selectedGame.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => {
                      setSelectedGame(null);
                      setIsFullScreen(false);
                    }}
                    className="p-2 hover:bg-[#ff0000] hover:text-black transition-colors ml-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Game Iframe */}
              <div className="flex-grow bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer (Controls/Info) */}
              <div className="p-4 border-t-2 border-white/10 bg-[#151515] flex justify-between items-center">
                <p className="text-white/40 text-xs font-mono uppercase">
                  Playing on ViscaBarca Unblocked
                </p>
                <div className="flex gap-4">
                  <button className="text-[#00ff00] text-xs font-mono uppercase hover:underline">Report Issue</button>
                  <button className="text-white/60 text-xs font-mono uppercase hover:underline">Save Game</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
