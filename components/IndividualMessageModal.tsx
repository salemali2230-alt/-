
import React, { useState, useEffect } from 'react';
import type { Student } from '../types.ts';
import { SendIcon, WhatsAppIcon } from './icons.tsx';

interface IndividualMessageModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (phone: string, message: string) => void;
}

const IndividualMessageModal: React.FC<IndividualMessageModalProps> = ({ student, isOpen, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMessage('');
    }
  }, [isOpen]);

  if (!isOpen || !student) return null;

  const handleSend = () => {
    if (message.trim()) {
      onSend(student.phone, message);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">إرسال رسالة خاصة إلى ولي أمر الطالب: <span className="text-blue-600">{student.name}</span></h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>
        <div>
          <label htmlFor="individualMessage" className="block text-sm font-medium text-gray-700 mb-1">
            نص الرسالة
          </label>
          <textarea
            id="individualMessage"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="اكتب رسالتك هنا..."
          ></textarea>
        </div>
        <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
          <button
            onClick={onClose}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            إلغاء
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span className="ml-2"><WhatsAppIcon /></span>
            إرسال عبر واتساب
          </button>
        </div>
         <div className="border-t mt-4 pt-3">
             <p className="text-xs text-gray-500 text-center">
                ملاحظة: سيتم فتح تطبيق واتساب الافتراضي على جهازك. يرجى التأكد من تسجيل الدخول إلى الحساب الصحيح (شخصي/تجاري).
            </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualMessageModal;