
import React, { useState } from 'react';
import type { Student } from '../types.ts';
import { TrashIcon, SendIcon, WhatsAppIcon } from './icons.tsx';

interface StudentListProps {
  students: Student[];
  deleteStudent: (id: number) => void;
  openIndividualMessageModal: (student: Student) => void;
  prepareBulkMessage: (phones: string[], message: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, deleteStudent, openIndividualMessageModal, prepareBulkMessage }) => {
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(new Set());
  const [groupMessage, setGroupMessage] = useState('');

  const handleSelectStudent = (id: number) => {
    const newSelection = new Set(selectedStudents);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedStudents(newSelection);
  };
  
  const handleSelectAll = () => {
    if (selectedStudents.size === students.length && students.length > 0) {
        setSelectedStudents(new Set());
    } else {
        setSelectedStudents(new Set(students.map(s => s.id)));
    }
  };

  const handleSendGroupMessage = () => {
    if (groupMessage.trim() && selectedStudents.size > 0) {
      const selectedPhones = students
        .filter(s => selectedStudents.has(s.id))
        .map(s => s.phone);
      prepareBulkMessage(selectedPhones, groupMessage);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">قائمة الطلاب</h2>
      
      {/* Group Message Section */}
      <div className="mb-4 border-b pb-4">
        <label htmlFor="groupMessage" className="block text-sm font-medium text-gray-700 mb-1">
          رسالة جماعية
        </label>
        <textarea
          id="groupMessage"
          rows={4}
          value={groupMessage}
          onChange={(e) => setGroupMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="اكتب رسالتك الجماعية هنا... سيتم إرسالها للطلاب المحددين."
        ></textarea>
        <button
          onClick={handleSendGroupMessage}
          disabled={selectedStudents.size === 0 || !groupMessage.trim()}
          className="mt-2 w-full inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span className="ml-2"><WhatsAppIcon /></span>
          إرسال إلى ({selectedStudents.size}) طلاب محددين
        </button>
      </div>
      
      {/* Student List */}
       <div className="flex-grow overflow-y-auto">
        {students.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">لم تتم إضافة أي طلاب بعد.</p>
        ) : (
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-2 rounded-md bg-gray-50">
               <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={students.length > 0 && selectedStudents.size === students.length}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ml-3"
                    />
                    <span className="font-semibold text-gray-700">تحديد الكل</span>
                </div>
            </li>
            {students.map(student => (
              <li key={student.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedStudents.has(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ml-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500" dir="ltr">{student.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button onClick={() => openIndividualMessageModal(student)} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors">
                    <SendIcon />
                  </button>
                  <button onClick={() => deleteStudent(student.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors">
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentList;