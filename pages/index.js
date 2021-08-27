import dynamic from 'next/dynamic';
const TextEditor = dynamic(() => import('../components/textEditor'));
// import TextEditor from '../components/textEditor';
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-200 p-20">
      <TextEditor />
    </div>
  );
}
