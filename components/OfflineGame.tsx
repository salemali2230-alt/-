
import React, { useState, useEffect, useRef } from 'react';

const OfflineGame: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('text-slate-300');
  const [guessCount, setGuessCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const guessInputRef = useRef<HTMLInputElement>(null);

  const maxGuesses = 10;

  const initGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('أنا أفكر في رقم بين 1 و 100. هل يمكنك تخمينه؟');
    setMessageColor('text-slate-300');
    setGuessCount(0);
    setIsGameOver(false);
    setTimeout(() => guessInputRef.current?.focus(), 0);
  };
  
  useEffect(() => {
    initGame();
  }, []);

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };
  
  const checkGuess = () => {
    if (isGameOver) return;
    
    const userGuess = Number(guess);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('الرجاء إدخال رقم صحيح بين 1 و 100.');
      setMessageColor('text-red-500');
      return;
    }

    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);

    if (userGuess === secretNumber) {
      setMessage(`تهانينا! لقد خمنت الرقم الصحيح (${secretNumber}) في ${newGuessCount} محاولة.`);
      setMessageColor('text-emerald-400');
      setIsGameOver(true);
    } else if (newGuessCount >= maxGuesses) {
      setMessage(`للأسف، لقد نفدت محاولاتك! الرقم الصحيح كان ${secretNumber}.`);
      setMessageColor('text-red-500');
      setIsGameOver(true);
    } else {
      if (userGuess < secretNumber) {
        setMessage(`خطأ! الرقم السري أكبر من ${userGuess}. لديك ${maxGuesses - newGuessCount} محاولات متبقية.`);
      } else {
        setMessage(`خطأ! الرقم السري أصغر من ${userGuess}. لديك ${maxGuesses - newGuessCount} محاولات متبقية.`);
      }
      setMessageColor('text-sky-400');
    }
    setGuess('');
    guessInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkGuess();
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center min-h-screen p-4 text-white font-sans" dir="rtl">
      <div className="bg-slate-800 border-4 border-slate-700 p-8 rounded-3xl w-full max-w-md text-center shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-1">
        <h1 className="text-4xl font-bold text-amber-400 mb-4">لعبة تخمين الأرقام</h1>
        <p className={`text-xl mb-6 min-h-[56px] transition-colors duration-300 ${messageColor}`}>
          {message}
        </p>

        <div className="space-y-4">
            {!isGameOver ? (
            <>
                <input
                ref={guessInputRef}
                type="number"
                value={guess}
                onChange={handleGuessChange}
                onKeyDown={handleKeyDown}
                placeholder="أدخل تخمينك"
                className="bg-slate-700 text-white text-xl text-center p-4 rounded-xl w-full border-none outline-none placeholder-slate-400 focus:ring-4 focus:ring-amber-400/50"
                disabled={isGameOver}
                />
                <button
                onClick={checkGuess}
                className="text-lg font-bold py-3 px-6 rounded-xl w-full border-none cursor-pointer transition-all duration-200 ease-in-out bg-amber-400 text-slate-800 hover:scale-105 hover:bg-amber-300 disabled:bg-gray-500"
                disabled={!guess}
                >
                تخمين
                </button>
            </>
            ) : (
            <button
                onClick={initGame}
                className="text-lg font-bold py-3 px-6 rounded-xl w-full border-none cursor-pointer transition-all duration-200 ease-in-out bg-emerald-500 text-slate-800 hover:scale-105 hover:bg-emerald-400"
            >
                العب مرة أخرى
            </button>
            )}
        </div>
        
        <div className="mt-6 text-sm text-slate-500">
           أنت غير متصل بالإنترنت حاليًا. يرجى إعادة تحميل الصفحة عند عودة الاتصال لاستخدام التطبيق.
        </div>
      </div>
    </div>
  );
};

export default OfflineGame;
