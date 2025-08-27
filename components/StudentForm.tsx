
import React, { useState } from 'react';
import { PlusIcon } from './icons';
import type { Student } from '../types';

interface StudentFormProps {
  addStudent: (student: Omit<Student, 'id'>) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ addStudent }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      addStudent({ name, phone });
      setName('');
      setPhone('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إضافة طالب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
            اسم الطالب
          </label>
          <input
            type="text"
            id="studentName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: أحمد علي"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
            رقم هاتف ولي الأمر
          </label>
          <input
            type="tel"
            id="parentPhone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="مثال: 9647701234567"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
           <p className="text-xs text-gray-500 mt-1">
            أدخل الرقم مع رمز الدولة وبدون علامة + أو أصفار بادئة.
           </p>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <span className="ml-2">
            <PlusIcon />
          </span>
          إضافة الطالب
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
