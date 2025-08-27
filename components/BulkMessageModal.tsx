
import React, { useState, useEffect } from 'react';
import type { Student } from '../types.ts';
import { WhatsAppIcon, CheckIcon } from './icons.tsx';

interface BulkMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { students: Student[]; message: string } | null;
  onSend: (phone: string, message: string) => void;
}

const BulkMessageModal: React.FC<BulkMessageModalProps> = ({ isOpen, onClose, data, onSend }) => {
  const [sentPhones, setSentPhones] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Reset sent status when modal is reopened with new data
    if (isOpen) {
      setSentPhones(new Set());
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const handleSend = (phone: string) => {
    onSend(phone, data.message);
    setSentPhones(prev => new Set(prev).add(phone));
  };

  const allSent = data.students.length > 0 && sentPhones.size === data.students.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl mx-4 flex flex-col" style={{ maxHeight: '90vh' }}>
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">إرسال رسالة جماعية</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>
        
        <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">نص الرسالة:</h3>
            <div className="bg-gray-100 p-3 rounded-md max-h-40 overflow-y-auto">
                <p className="text-gray-800 whitespace-pre-wrap">{data.message}</p>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto">
             <h3 className="font-semibold text-gray-700 mb-2">
                المستلمون ({sentPhones.size}/{data.students.length}):
             </h3>
             <ul className="space-y-2">
                {data.students.map(student => {
                    const isSent = sentPhones.has(student.phone);
                    return (
                        <li key={student.id} className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100">
                            <div>
                                <p className="font-semibold text-gray-800">{student.name}</p>
                                <p className="text-sm text-gray-500" dir="ltr">{student.phone}</p>
                            </div>
                            <button
                                onClick={() => handleSend(student.phone)}
                                disabled={isSent}
                                className={`inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                                    isSent 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                                }`}
                            >
                                <span className="ml-2">
                                  {isSent ? <CheckIcon/> : <WhatsAppIcon />}
                                </span>
                                {isSent ? 'تم الإرسال' : 'إرسال'}
                            </button>
                        </li>
                    )
                })}
             </ul>
        </div>
        
        <div className="mt-6 border-t pt-4">
            <p className="text-xs text-gray-500 text-center">
              ملاحظة: يجب النقر على زر "إرسال" لكل طالب على حدة. سيتم فتح تطبيق واتساب الافتراضي على جهازك لكل رسالة.
            </p>
            <div className="mt-4 flex justify-end">
                 <button
                    onClick={onClose}
                    className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {allSent ? 'إنهاء' : 'إغلاق'}
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BulkMessageModal;