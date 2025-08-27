
import React, { useState } from 'react';
import type { Student } from './types.ts';
import Alert from './components/Alert.tsx';
import StudentForm from './components/StudentForm.tsx';
import StudentList from './components/StudentList.tsx';
import IndividualMessageModal from './components/IndividualMessageModal.tsx';
import BulkMessageModal from './components/BulkMessageModal.tsx';
import { WhatsAppIcon } from './components/icons.tsx';
import OfflineGame from './components/OfflineGame.tsx';

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [students, setStudents] = useState<Student[]>([]);
  const [senderPhone, setSenderPhone] = useState('964');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkMessageData, setBulkMessageData] = useState<{students: Student[], message: string} | null>(null);

  const addStudent = (student: Omit<Student, 'id'>) => {
    setStudents(prev => [...prev, { ...student, id: Date.now() }]);
  };

  const deleteStudent = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const openIndividualMessageModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  
  const cleanPhoneNumber = (phone: string): string => {
    return phone.replace(/[^0-9]/g, '');
  }

  const sendWhatsAppMessage = (phone: string, message: string) => {
    const cleanedPhone = cleanPhoneNumber(phone);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanedPhone}?text=${encodedMessage}`, '_blank');
  };

  const prepareBulkMessage = (phones: string[], message: string) => {
    const selectedStudentsForBulk = students.filter(s => phones.includes(s.phone));
    setBulkMessageData({ students: selectedStudentsForBulk, message });
    setIsBulkModalOpen(true);
  };

  if (!isOnline) {
    return <OfflineGame />;
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <div className="flex items-center space-x-2 space-x-reverse">
             <span className="text-green-500"><WhatsAppIcon /></span>
             <h1 className="text-2xl font-bold text-gray-800">
                أداة التواصل مع أولياء الأمور
             </h1>
           </div>
           <div className="flex items-center">
             <label htmlFor="senderPhone" className="text-sm font-medium text-gray-700 ml-2">رقم هاتفك:</label>
             <div className="relative">
                 <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">+</span>
                 <input 
                    type="tel" 
                    id="senderPhone"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-40 pr-8 pl-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    dir="ltr"
                 />
             </div>
           </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Alert message="عند إرسال رسالة جماعية، يجب أن يكون رقم هاتفك (المُدخل أعلاه) ضمن جهات اتصال المُرسَل إليهم لضمان وصول الرسالة." />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <StudentForm addStudent={addStudent} />
          </div>
          <div className="lg:col-span-2">
            <StudentList 
              students={students}
              deleteStudent={deleteStudent}
              openIndividualMessageModal={openIndividualMessageModal}
              prepareBulkMessage={prepareBulkMessage}
            />
          </div>
        </div>
      </main>

      <IndividualMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        onSend={sendWhatsAppMessage}
      />

      <BulkMessageModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        data={bulkMessageData}
        onSend={sendWhatsAppMessage}
      />

      <footer className="text-center py-4 text-gray-500 text-sm mt-8">
        <p>تم التطوير لتسهيل التواصل المدرسي.</p>
      </footer>
    </div>
  );
}

export default App;