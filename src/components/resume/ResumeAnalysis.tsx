import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ProgressBar from '../common/ProgressBar';
import { Upload, CheckCircle } from 'lucide-react';

interface ResumeAnalysisProps {
  onAnalysisComplete?: (skills: string[]) => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ onAnalysisComplete }) => {
  const { isDark } = useTheme();
  const [uploading, setUploading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const mockSkills = [
    'Python', 'JavaScript', 'React', 'SQL', 'Data Analysis',
    'Machine Learning', 'Communication', 'Leadership',
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(20);

    // Simulate file reading
    setTimeout(() => {
      setProgress(50);

      // Simulate resume parsing
      const reader = new FileReader();
      reader.onload = () => {
        setProgress(80);

        // Mock skill extraction
        const skills = mockSkills.filter(() => Math.random() > 0.3);
        setExtractedSkills(skills);
        setProgress(100);

        setTimeout(() => {
          setUploading(false);
          onAnalysisComplete?.(skills);
        }, 500);
      };
      reader.readAsText(file);
    }, 1000);
  };

  return (
    <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          📄 Resume Analysis
        </h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Upload your resume to extract skills and experience
        </p>
      </div>

      {uploading && progress > 0 && (
        <div className="mb-6">
          <ProgressBar current={progress} total={100} label="Parsing Resume" />
        </div>
      )}

      <div className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${isDark ? 'border-gray-600 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'} transition`}>
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          id="resume-input"
        />
        <label
          htmlFor="resume-input"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload size={48} className={`mb-2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Drop your resume here
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            or click to browse (PDF, TXT, DOC, DOCX)
          </p>
        </label>
      </div>

      {extractedSkills.length > 0 && (
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'} border ${isDark ? 'border-gray-600' : 'border-blue-200'}`}>
          <h3 className={`font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
            <CheckCircle size={20} className="mr-2 text-green-500" />
            Extracted Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {extractedSkills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-200 text-blue-800'}`}
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
