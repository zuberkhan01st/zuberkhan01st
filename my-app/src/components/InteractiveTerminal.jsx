'use client'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, Square, Trash2 } from 'lucide-react';

export default function InteractiveTerminal({ commands = [] }) {
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const defaultCommands = {
    'whoami': 'zuber-khan\nSoftware Engineer | GenAI Developer',
    'ls': 'projects  skills.txt  README.md',
    'ls projects': 'RepoRadar\nRFP-IntelliCheck\nAgriAI\nAirborne-Threat-Detection',
    'cat skills.txt': 'Node.js | TypeScript | Python\nReact | Next.js | Express\nMongoDB | Redis | Docker\nGenAI | LangChain | RAG',
    'git status': 'On branch: main\nWorking tree clean\nLast commit: Building amazing products',
    'help': 'Available commands:\n  whoami - Show user info\n  ls - List files\n  ls projects - List projects\n  cat skills.txt - Show skills\n  git status - Git status\n  clear - Clear terminal\n  help - Show this help',
    'clear': '',
  };

  const commandsToUse = commands.length > 0 
    ? Object.fromEntries(commands.map(c => [c.cmd, c.output]))
    : defaultCommands;

  useEffect(() => {
    // Auto focus input
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing, commandHistory]);

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleCommand = async (cmd) => {
    if (!cmd.trim()) return;
    
    setIsProcessing(true);
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    setCommandHistory(prev => [...prev, { cmd: trimmedCmd, output: '' }]);
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Handle clear command
    if (trimmedCmd === 'clear') {
      setCommandHistory([]);
      setIsProcessing(false);
      return;
    }
    
    // Get output
    const output = commandsToUse[trimmedCmd] || `Command not found: ${trimmedCmd}\nType 'help' for available commands`;
    
    // Update last command with output
    setCommandHistory(prev => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1] = { cmd: trimmedCmd, output };
      return newHistory;
    });
    
    setIsProcessing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim() && !isProcessing) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleClear = () => {
    setCommandHistory([]);
    setCurrentInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300 font-mono">terminal</span>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
            title="Clear terminal"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="p-6 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto terminal-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="space-y-4">
            {/* Welcome Message */}
            {commandHistory.length === 0 && (
              <div className="text-gray-400 mb-4">
                <div className="text-green-400 mb-2">Welcome to Zuber's Terminal</div>
                <div className="text-sm">Type 'help' to see available commands</div>
              </div>
            )}

            {/* Command History */}
            {commandHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-gray-300">{item.cmd}</span>
                </div>
                {item.output && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-400 ml-4 whitespace-pre-line"
                  >
                    {item.output}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                disabled={isProcessing}
                className="flex-1 bg-transparent text-gray-300 outline-none font-mono"
                placeholder={isProcessing ? 'Processing...' : 'Type a command'}
                autoComplete="off"
              />
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-green-400"
              >
                |
              </motion.span>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
