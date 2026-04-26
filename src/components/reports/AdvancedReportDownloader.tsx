import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Download, FileText, File, BarChart3, 
  PieChart, TrendingUp, Calendar, Clock, User,
  Award, Target, Brain, Briefcase, BookOpen,
  ChevronRight, CheckCircle, AlertCircle, Info,
  Loader, Share2, Mail, Save, Sparkles,
  Zap, Star, Heart, Eye, Settings, Filter
} from 'lucide-react';

interface AdvancedReportData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  careerAnalysis: {
    overallScore: number;
    topCareers: Array<{
      title: string;
      match: number;
      salary: string;
      growth: string;
    }>;
    skills: Array<{
      name: string;
      level: string;
      category: string;
    }>;
    recommendations: Array<{
      title: string;
      description: string;
      priority: string;
    }>;
  };
  assessmentResults: {
    personality: Record<string, number>;
    skills: Record<string, number>;
    interests: Record<string, number>;
  };
  learningPath: {
    currentLevel: string;
    targetLevel: string;
    timeline: string;
    courses: Array<{
      name: string;
      provider: string;
      duration: string;
      difficulty: string;
    }>;
  };
  generatedAt: Date;
}

interface AdvancedReportDownloaderProps {
  reportData?: AdvancedReportData;
}

const AdvancedReportDownloader: React.FC<AdvancedReportDownloaderProps> = ({ reportData }) => {
  const { isDark } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'word' | 'excel'>('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [includeAnimations, setIncludeAnimations] = useState(true);
  const [reportStyle, setReportStyle] = useState<'professional' | 'modern' | 'creative'>('professional');
  const [colorScheme, setColorScheme] = useState<'blue' | 'purple' | 'green'>('blue');

  // Sample data with enhanced details
  const sampleReportData: AdvancedReportData = {
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA'
    },
    careerAnalysis: {
      overallScore: 85,
      topCareers: [
        { title: 'AI/ML Engineer', match: 92, salary: '$120K-$180K', growth: '+35%' },
        { title: 'Data Scientist', match: 88, salary: '$100K-$150K', growth: '+28%' },
        { title: 'Software Developer', match: 76, salary: '$90K-$130K', growth: '+22%' }
      ],
      skills: [
        { name: 'Python', level: 'Advanced', category: 'Technical' },
        { name: 'Machine Learning', level: 'Intermediate', category: 'Technical' },
        { name: 'Communication', level: 'Advanced', category: 'Soft' },
        { name: 'Leadership', level: 'Intermediate', category: 'Soft' }
      ],
      recommendations: [
        { title: 'Learn TensorFlow', description: 'Critical for AI/ML roles', priority: 'High' },
        { title: 'Get AWS Certification', description: 'Increases job opportunities', priority: 'Medium' },
        { title: 'Build Portfolio Projects', description: 'Demonstrate practical skills', priority: 'High' }
      ]
    },
    assessmentResults: {
      personality: { Realistic: 75, Investigative: 85, Artistic: 60, Social: 70, Enterprising: 65, Conventional: 55 },
      skills: { Technical: 85, Analytical: 80, Creative: 70, Leadership: 60, Communication: 75 },
      interests: { Technology: 90, Science: 85, Business: 70, Arts: 60, Education: 75 }
    },
    learningPath: {
      currentLevel: 'Intermediate',
      targetLevel: 'Expert',
      timeline: '6-12 months',
      courses: [
        { name: 'Deep Learning Specialization', provider: 'Coursera', duration: '3 months', difficulty: 'Advanced' },
        { name: 'AWS Machine Learning', provider: 'AWS', duration: '2 months', difficulty: 'Intermediate' },
        { name: 'TensorFlow Developer Certificate', provider: 'Google', duration: '1 month', difficulty: 'Intermediate' }
      ]
    },
    generatedAt: new Date()
  };

  const dataToUse = reportData || sampleReportData;

  const generatePieChartSVG = (data: Record<string, number>, title: string, colors: string[]) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    let currentAngle = 0;
    const centerX = 150;
    const centerY = 150;
    const radius = 100;

    const slices = Object.entries(data).map(([key, value], index) => {
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      currentAngle = endAngle;
      
      return {
        path: pathData,
        color: colors[index % colors.length],
        label: key,
        value: value,
        percentage: percentage.toFixed(1)
      };
    });

    return `
      <div style="text-align: center; margin: 20px 0;">
        <h3 style="color: #333; margin-bottom: 10px;">${title}</h3>
        <svg width="300" height="300" viewBox="0 0 300 300">
          ${slices.map(slice => `
            <path d="${slice.path}" fill="${slice.color}" stroke="white" stroke-width="2">
              ${includeAnimations ? `<animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0s" fill="freeze"/>` : ''}
            </path>
          `).join('')}
          <text x="150" y="150" text-anchor="middle" font-size="24" font-weight="bold" fill="#333">
            ${total}
          </text>
        </svg>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 10px;">
          ${slices.map(slice => `
            <div style="display: flex; align-items: center; gap: 5px;">
              <div style="width: 15px; height: 15px; background: ${slice.color}; border-radius: 3px;"></div>
              <span style="font-size: 12px; color: #666;">${slice.label}: ${slice.percentage}%</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  const generateBarChartSVG = (data: Array<{label: string, value: number}>, title: string, color: string) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = 40;
    const barSpacing = 20;
    const chartHeight = 200;
    const chartWidth = data.length * (barWidth + barSpacing);
    
    return `
      <div style="text-align: center; margin: 20px 0;">
        <h3 style="color: #333; margin-bottom: 10px;">${title}</h3>
        <svg width="${chartWidth + 100}" height="${chartHeight + 50}" viewBox="0 0 ${chartWidth + 100} ${chartHeight + 50}">
          ${data.map((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = 50 + index * (barWidth + barSpacing);
            const y = chartHeight - barHeight + 20;
            
            return `
              <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${color}" rx="4">
                ${includeAnimations ? `<animate attributeName="height" from="0" to="${barHeight}" dur="0.8s" begin="${index * 0.1}s" fill="freeze"/>
                <animate attributeName="y" from="${chartHeight + 20}" to="${y}" dur="0.8s" begin="${index * 0.1}s" fill="freeze"/>` : ''}
              </rect>
              <text x="${x + barWidth/2}" y="${chartHeight + 35}" text-anchor="middle" font-size="12" fill="#666">
                ${item.label}
              </text>
              <text x="${x + barWidth/2}" y="${y - 5}" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">
                ${item.value}%
              </text>
            `;
          }).join('')}
        </svg>
      </div>
    `;
  };

  const generateRadarChartSVG = (data: Record<string, number>, title: string, color: string) => {
    const centerX = 150;
    const centerY = 150;
    const radius = 80;
    const angleStep = (2 * Math.PI) / Object.keys(data).length;
    
    const points = Object.entries(data).map(([key, value], index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + (value / 100) * radius * Math.cos(angle);
      const y = centerY + (value / 100) * radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return `
      <div style="text-align: center; margin: 20px 0;">
        <h3 style="color: #333; margin-bottom: 10px;">${title}</h3>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <!-- Grid circles -->
          ${[0.2, 0.4, 0.6, 0.8, 1.0].map(level => {
            const r = level * radius;
            return `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="#ddd" stroke-width="1"/>`;
          }).join('')}
          
          <!-- Grid lines -->
          ${Object.keys(data).map((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#ddd" stroke-width="1"/>`;
          }).join('')}
          
          <!-- Data polygon -->
          <polygon points="${points}" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="2">
            ${includeAnimations ? `<animate attributeName="points" from="${centerX},${centerY} ${centerX},${centerY} ${centerX},${centerY} ${centerX},${centerY} ${centerX},${centerY} ${centerX},${centerY}" to="${points}" dur="1s" fill="freeze"/>` : ''}
          </polygon>
          
          <!-- Labels -->
          ${Object.keys(data).map((key, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = centerX + (radius + 20) * Math.cos(angle);
            const y = centerY + (radius + 20) * Math.sin(angle);
            return `<text x="${x}" y="${y}" text-anchor="middle" font-size="12" fill="#666">${key}</text>`;
          }).join('')}
        </svg>
      </div>
    `;
  };

  const generateAdvancedPDFReport = async () => {
    setIsGenerating(true);
    
    const colors = {
      blue: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
      purple: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'],
      green: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0']
    };

    const selectedColors = colors[colorScheme];
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Advanced Career Analysis Report</title>
        <style>
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            margin: 40px; 
            line-height: 1.6; 
            color: #333;
            background: #f9fafb;
          }
          .header { 
            text-align: center; 
            border-bottom: 3px solid ${selectedColors[0]}; 
            padding-bottom: 30px; 
            margin-bottom: 40px; 
            background: linear-gradient(135deg, ${selectedColors[0]}10, ${selectedColors[1]}10);
            border-radius: 12px;
            padding: 30px;
          }
          .section { 
            margin-bottom: 40px; 
            padding: 25px; 
            border-radius: 12px; 
            background: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .section-title { 
            color: ${selectedColors[0]}; 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 20px;
            border-left: 4px solid ${selectedColors[0]};
            padding-left: 15px;
          }
          .score-display { 
            text-align: center; 
            font-size: 48px; 
            font-weight: bold; 
            background: linear-gradient(135deg, ${selectedColors[0]}, ${selectedColors[1]});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 20px 0;
          }
          .career-item { 
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb); 
            padding: 20px; 
            margin: 15px 0; 
            border-radius: 12px;
            border-left: 4px solid ${selectedColors[0]};
          }
          .skill-item { 
            display: inline-block; 
            background: ${selectedColors[0]}20; 
            color: ${selectedColors[0]}; 
            padding: 8px 16px; 
            margin: 5px; 
            border-radius: 20px; 
            font-size: 14px;
            font-weight: 500;
          }
          .recommendation { 
            background: linear-gradient(135deg, #fef3c7, #fed7aa); 
            border-left: 4px solid #f59e0b; 
            padding: 20px; 
            margin: 15px 0; 
            border-radius: 12px;
          }
          .chart-placeholder { 
            background: #f9fafb; 
            border: 2px dashed #d1d5db; 
            height: 200px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin: 20px 0; 
            border-radius: 12px;
          }
          .footer { 
            text-align: center; 
            margin-top: 50px; 
            font-size: 12px; 
            color: #6b7280; 
            padding: 20px;
            background: #f9fafb;
            border-radius: 12px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            border-radius: 8px;
            overflow: hidden;
          }
          th, td { 
            border: 1px solid #e5e7eb; 
            padding: 15px; 
            text-align: left; 
          }
          th { 
            background: linear-gradient(135deg, ${selectedColors[0]}, ${selectedColors[1]}); 
            color: white;
            font-weight: 600;
          }
          .highlight {
            background: ${selectedColors[0]}10;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
          }
          .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          @media print {
            body { margin: 20px; }
            .section { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="font-size: 36px; margin-bottom: 10px;">🎯 Advanced Career Analysis Report</h1>
          <p style="font-size: 18px; color: #666;">Generated on ${dataToUse.generatedAt.toLocaleDateString()}</p>
          <p style="font-size: 16px; color: #666;">For: <span class="highlight">${dataToUse.personalInfo.name}</span></p>
          <p style="font-size: 14px; color: #999; margin-top: 10px;">📧 ${dataToUse.personalInfo.email} | 📱 ${dataToUse.personalInfo.phone}</p>
        </div>

        <div class="section">
          <div class="section-title">📊 Overall Career Score</div>
          <div class="score-display">${dataToUse.careerAnalysis.overallScore}/100</div>
          <p style="text-align: center; font-size: 18px; color: #666; margin-bottom: 30px;">
            Your career analysis shows <span class="highlight">strong potential</span> with room for growth in specific areas
          </p>
          
          ${generateBarChartSVG(
            dataToUse.careerAnalysis.topCareers.map(c => ({label: c.title.split(' ')[0], value: c.match})),
            'Career Match Percentages',
            selectedColors[0]
          )}
        </div>

        <div class="section">
          <div class="section-title">🎯 Top Career Matches</div>
          ${dataToUse.careerAnalysis.topCareers.map(career => `
            <div class="career-item">
              <h3 style="color: ${selectedColors[0]}; margin-bottom: 10px;">${career.title}</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 10px;">
                <div>
                  <strong>Match:</strong> <span style="color: ${selectedColors[0]}; font-size: 20px;">${career.match}%</span>
                </div>
                <div>
                  <strong>Salary:</strong> ${career.salary}
                </div>
                <div>
                  <strong>Growth:</strong> <span style="color: #10b981;">${career.growth}</span>
                </div>
              </div>
              <div style="background: ${selectedColors[0]}20; height: 8px; border-radius: 4px; margin-top: 10px;">
                <div style="background: ${selectedColors[0]}; height: 100%; width: ${career.match}%; border-radius: 4px;"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">🛠️ Skills Analysis</div>
          <div class="two-column">
            <div>
              <h4 style="color: ${selectedColors[0]}; margin-bottom: 15px;">Technical Skills</h4>
              ${dataToUse.careerAnalysis.skills.filter(s => s.category === 'Technical').map(skill => 
                `<div class="skill-item">${skill.name} - ${skill.level}</div>`
              ).join('')}
            </div>
            <div>
              <h4 style="color: ${selectedColors[0]}; margin-bottom: 15px;">Soft Skills</h4>
              ${dataToUse.careerAnalysis.skills.filter(s => s.category === 'Soft').map(skill => 
                `<div class="skill-item">${skill.name} - ${skill.level}</div>`
              ).join('')}
            </div>
          </div>
        </div>

        ${includeCharts ? `
        <div class="section">
          <div class="section-title">📈 Visual Analytics</div>
          <div class="two-column">
            ${generatePieChartSVG(dataToUse.assessmentResults.personality, 'Personality Assessment', selectedColors)}
            ${generateRadarChartSVG(dataToUse.assessmentResults.skills, 'Skills Distribution', selectedColors[0])}
          </div>
          ${generatePieChartSVG(dataToUse.assessmentResults.interests, 'Interest Areas', selectedColors)}
        </div>
        ` : ''}

        <div class="section">
          <div class="section-title">💡 Recommendations</div>
          ${dataToUse.careerAnalysis.recommendations.map(rec => `
            <div class="recommendation">
              <h4 style="color: #d97706; margin-bottom: 8px;">${rec.title} (${rec.priority} Priority)</h4>
              <p>${rec.description}</p>
            </div>
          `).join('')}
        </div>

        ${includeDetails ? `
        <div class="section">
          <div class="section-title">📋 Detailed Assessment Results</div>
          <h4 style="color: ${selectedColors[0]}; margin-bottom: 15px;">Personality Assessment</h4>
          <table>
            <tr><th>Trait</th><th>Score</th><th>Level</th></tr>
            ${Object.entries(dataToUse.assessmentResults.personality).map(([trait, score]) => {
              const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Improvement';
              const levelColor = score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444';
              return `<tr><td><strong>${trait}</strong></td><td>${score}%</td><td style="color: ${levelColor}; font-weight: 600;">${level}</td></tr>`;
            }).join('')}
          </table>
        </div>

        <div class="section">
          <div class="section-title">🎓 Learning Path</div>
          <div style="background: ${selectedColors[0]}10; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
              <div>
                <h5 style="color: #666; font-size: 14px; margin-bottom: 5px;">Current Level</h5>
                <p style="font-size: 18px; font-weight: bold; color: ${selectedColors[0]};">${dataToUse.learningPath.currentLevel}</p>
              </div>
              <div>
                <h5 style="color: #666; font-size: 14px; margin-bottom: 5px;">Target Level</h5>
                <p style="font-size: 18px; font-weight: bold; color: ${selectedColors[0]};">${dataToUse.learningPath.targetLevel}</p>
              </div>
              <div>
                <h5 style="color: #666; font-size: 14px; margin-bottom: 5px;">Timeline</h5>
                <p style="font-size: 18px; font-weight: bold; color: ${selectedColors[0]};">${dataToUse.learningPath.timeline}</p>
              </div>
            </div>
          </div>
          
          <h4 style="color: ${selectedColors[0]}; margin-bottom: 15px;">Recommended Courses</h4>
          ${dataToUse.learningPath.courses.map(course => `
            <div class="career-item">
              <h4>${course.name}</h4>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                <div><strong>Provider:</strong> ${course.provider}</div>
                <div><strong>Duration:</strong> ${course.duration}</div>
                <div><strong>Difficulty:</strong> <span style="color: ${course.difficulty === 'Advanced' ? '#ef4444' : course.difficulty === 'Intermediate' ? '#f59e0b' : '#10b981'};">${course.difficulty}</span></div>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        <div class="footer">
          <p style="margin-bottom: 10px;">🤖 This report was generated by AI Career Guidance System</p>
          <p style="margin-bottom: 10px;">📊 Report Style: <strong>${reportStyle}</strong> | Color Scheme: <strong>${colorScheme}</strong></p>
          <p>For questions or additional analysis, please contact support | Generated: ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `advanced-career-analysis-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setIsGenerating(false);
  };

  const generateAdvancedWordReport = async () => {
    setIsGenerating(true);
    
    const colors = {
      blue: ['#3B82F6', '#60A5FA', '#93C5FD'],
      purple: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
      green: ['#10B981', '#34D399', '#6EE7B7']
    };

    const selectedColors = colors[colorScheme];
    
    const wordContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
      <head>
        <meta charset="utf-8">
        <title>Advanced Career Analysis Report</title>
        <style>
          body { 
            font-family: 'Calibri', Arial, sans-serif; 
            margin: 1in; 
            line-height: 1.6; 
            color: #333;
          }
          h1 { 
            color: ${selectedColors[0]}; 
            font-size: 28px; 
            border-bottom: 3px solid ${selectedColors[0]}; 
            padding-bottom: 10px; 
          }
          h2 { 
            color: ${selectedColors[0]}; 
            font-size: 20px; 
            border-left: 4px solid ${selectedColors[0]}; 
            padding-left: 10px; 
            margin-top: 20px;
          }
          .score { 
            font-size: 36px; 
            font-weight: bold; 
            color: ${selectedColors[0]}; 
            text-align: center; 
            background: ${selectedColors[0]}10;
            padding: 20px;
            border-radius: 8px;
          }
          table { 
            border: 1px solid #ddd; 
            border-collapse: collapse; 
            width: 100%; 
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left; 
          }
          th { 
            background: ${selectedColors[0]}; 
            color: white; 
            font-weight: bold; 
          }
          .career-box { 
            background: #f9f9f9; 
            border-left: 4px solid ${selectedColors[0]}; 
            padding: 15px; 
            margin: 10px 0; 
          }
          .skill-tag { 
            display: inline-block; 
            background: ${selectedColors[0]}20; 
            color: ${selectedColors[0]}; 
            padding: 4px 8px; 
            margin: 2px; 
            border-radius: 12px; 
            font-size: 12px;
          }
          .recommendation { 
            background: #fff9e6; 
            border-left: 4px solid #f59e0b; 
            padding: 15px; 
            margin: 10px 0; 
          }
          .chart-area { 
            background: #f5f5f5; 
            border: 2px dashed #ccc; 
            height: 150px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <h1>🎯 Advanced Career Analysis Report</h1>
        <p><strong>Name:</strong> ${dataToUse.personalInfo.name}</p>
        <p><strong>Email:</strong> ${dataToUse.personalInfo.email}</p>
        <p><strong>Date:</strong> ${dataToUse.generatedAt.toLocaleDateString()}</p>
        <p><strong>Report Style:</strong> ${reportStyle} | <strong>Color Scheme:</strong> ${colorScheme}</p>
        
        <h2>📊 Overall Career Score</h2>
        <div class="score">${dataToUse.careerAnalysis.overallScore}/100</div>
        <p>Your career analysis shows strong potential with room for growth in specific areas.</p>
        
        <h2>🎯 Top Career Matches</h2>
        <table>
          <tr><th>Career</th><th>Match %</th><th>Salary Range</th><th>Growth</th></tr>
          ${dataToUse.careerAnalysis.topCareers.map(career => 
            `<tr><td>${career.title}</td><td>${career.match}%</td><td>${career.salary}</td><td>${career.growth}</td></tr>`
          ).join('')}
        </table>
        
        <h2>🛠️ Skills Analysis</h2>
        <h3>Technical Skills</h3>
        ${dataToUse.careerAnalysis.skills.filter(s => s.category === 'Technical').map(skill => 
          `<span class="skill-tag">${skill.name} - ${skill.level}</span>`
        ).join('')}
        
        <h3>Soft Skills</h3>
        ${dataToUse.careerAnalysis.skills.filter(s => s.category === 'Soft').map(skill => 
          `<span class="skill-tag">${skill.name} - ${skill.level}</span>`
        ).join('')}
        
        ${includeCharts ? `
        <h2>📈 Visual Analytics</h2>
        <div class="chart-area">
          <p>📊 Personality Assessment Chart</p>
        </div>
        <div class="chart-area">
          <p>📈 Skills Distribution Chart</p>
        </div>
        <div class="chart-area">
          <p>🎯 Interest Areas Chart</p>
        </div>
        ` : ''}
        
        <h2>💡 Recommendations</h2>
        ${dataToUse.careerAnalysis.recommendations.map(rec => `
          <div class="recommendation">
            <h3>${rec.title} (${rec.priority} Priority)</h3>
            <p>${rec.description}</p>
          </div>
        `).join('')}
        
        ${includeDetails ? `
        <h2>📋 Assessment Details</h2>
        <h3>Personality Assessment</h3>
        <table>
          <tr><th>Trait</th><th>Score</th><th>Level</th></tr>
          ${Object.entries(dataToUse.assessmentResults.personality).map(([trait, score]) => {
            const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Improvement';
            return `<tr><td>${trait}</td><td>${score}%</td><td>${level}</td></tr>`;
          }).join('')}
        </table>
        
        <h2>🎓 Learning Path</h2>
        <p><strong>Current Level:</strong> ${dataToUse.learningPath.currentLevel}</p>
        <p><strong>Target Level:</strong> ${dataToUse.learningPath.targetLevel}</p>
        <p><strong>Timeline:</strong> ${dataToUse.learningPath.timeline}</p>
        
        <h3>Recommended Courses</h3>
        <table>
          <tr><th>Course</th><th>Provider</th><th>Duration</th><th>Difficulty</th></tr>
          ${dataToUse.learningPath.courses.map(course => 
            `<tr><td>${course.name}</td><td>${course.provider}</td><td>${course.duration}</td><td>${course.difficulty}</td></tr>`
          ).join('')}
        </table>
        ` : ''}
        
        <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
          This report was generated by AI Career Guidance System<br/>
          Report Style: ${reportStyle} | Color Scheme: ${colorScheme}<br/>
          Generated: ${new Date().toLocaleString()}
        </p>
      </body>
      </html>
    `;

    const blob = new Blob([wordContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `advanced-career-analysis-${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setIsGenerating(false);
  };

  const generateAdvancedExcelReport = async () => {
    setIsGenerating(true);
    
    const csvContent = [
      ['Advanced Career Analysis Report', ''],
      ['Generated on', dataToUse.generatedAt.toLocaleDateString()],
      ['Report Style', reportStyle],
      ['Color Scheme', colorScheme],
      ['Name', dataToUse.personalInfo.name],
      ['Email', dataToUse.personalInfo.email],
      ['Phone', dataToUse.personalInfo.phone],
      ['Location', dataToUse.personalInfo.location],
      ['', ''],
      ['Overall Score', dataToUse.careerAnalysis.overallScore],
      ['', ''],
      ['Top Career Matches', '', '', ''],
      ['Career', 'Match %', 'Salary Range', 'Growth'],
      ...dataToUse.careerAnalysis.topCareers.map(career => [
        career.title, career.match, career.salary, career.growth
      ]),
      ['', ''],
      ['Skills Analysis', '', ''],
      ['Skill Name', 'Level', 'Category'],
      ...dataToUse.careerAnalysis.skills.map(skill => [
        skill.name, skill.level, skill.category
      ]),
      ['', ''],
      ['Recommendations', '', ''],
      ['Title', 'Priority', 'Description'],
      ...dataToUse.careerAnalysis.recommendations.map(rec => [
        rec.title, rec.priority, rec.description
      ]),
      ['', ''],
      ['Personality Assessment', '', ''],
      ['Trait', 'Score', 'Level'],
      ...Object.entries(dataToUse.assessmentResults.personality).map(([trait, score]) => {
        const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Improvement';
        return [trait, score, level];
      }),
      ['', ''],
      ['Skills Assessment', '', ''],
      ['Skill Area', 'Score', 'Level'],
      ...Object.entries(dataToUse.assessmentResults.skills).map(([skill, score]) => {
        const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Improvement';
        return [skill, score, level];
      }),
      ['', ''],
      ['Interest Areas', '', ''],
      ['Interest', 'Score', 'Level'],
      ...Object.entries(dataToUse.assessmentResults.interests).map(([interest, score]) => {
        const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Improvement';
        return [interest, score, level];
      }),
      ['', ''],
      ['Learning Path', '', ''],
      ['Current Level', dataToUse.learningPath.currentLevel],
      ['Target Level', dataToUse.learningPath.targetLevel],
      ['Timeline', dataToUse.learningPath.timeline],
      ['', ''],
      ['Recommended Courses', '', '', '', ''],
      ['Course Name', 'Provider', 'Duration', 'Difficulty'],
      ...dataToUse.learningPath.courses.map(course => [
        course.name, course.provider, course.duration, course.difficulty
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `advanced-career-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setIsGenerating(false);
  };

  const handleDownload = () => {
    switch (downloadFormat) {
      case 'pdf':
        generateAdvancedPDFReport();
        break;
      case 'word':
        generateAdvancedWordReport();
        break;
      case 'excel':
        generateAdvancedExcelReport();
        break;
    }
  };

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Download className="text-white" size={24} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Advanced Report Generator
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Professional reports with charts, animations & formatting
            </p>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Report for {dataToUse.personalInfo.name}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Generated on {dataToUse.personalInfo.email}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {dataToUse.careerAnalysis.overallScore}/100
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Overall Score
            </p>
          </div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Download Format
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'pdf', label: 'PDF', icon: FileText, description: 'Charts & Animations' },
            { value: 'word', label: 'Word', icon: File, description: 'Professional Layout' },
            { value: 'excel', label: 'Excel', icon: BarChart3, description: 'Data Analysis' }
          ].map((format) => (
            <button
              key={format.value}
              onClick={() => setDownloadFormat(format.value as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                downloadFormat === format.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <format.icon className={`mx-auto mb-2 ${downloadFormat === format.value ? 'text-blue-500' : isDark ? 'text-gray-400' : 'text-gray-600'}`} size={24} />
              <div className={`text-sm font-medium ${downloadFormat === format.value ? 'text-blue-600 dark:text-blue-400' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {format.label}
              </div>
              <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {format.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Style Selection */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Report Style
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'professional', label: 'Professional', description: 'Corporate Style' },
            { value: 'modern', label: 'Modern', description: 'Clean Design' },
            { value: 'creative', label: 'Creative', description: 'Colorful Layout' }
          ].map((style) => (
            <button
              key={style.value}
              onClick={() => setReportStyle(style.value as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                reportStyle === style.value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className={`text-sm font-medium ${reportStyle === style.value ? 'text-purple-600 dark:text-purple-400' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {style.label}
              </div>
              <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {style.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Scheme */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Color Scheme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'blue', label: 'Blue', colors: ['bg-blue-500', 'bg-blue-400', 'bg-blue-300'] },
            { value: 'purple', label: 'Purple', colors: ['bg-purple-500', 'bg-purple-400', 'bg-purple-300'] },
            { value: 'green', label: 'Green', colors: ['bg-green-500', 'bg-green-400', 'bg-green-300'] }
          ].map((scheme) => (
            <button
              key={scheme.value}
              onClick={() => setColorScheme(scheme.value as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                colorScheme === scheme.value
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex justify-center space-x-1 mb-2">
                {scheme.colors.map((color, index) => (
                  <div key={index} className={`w-6 h-6 ${color} rounded`}></div>
                ))}
              </div>
              <div className={`text-sm font-medium ${colorScheme === scheme.value ? 'text-green-600 dark:text-green-400' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {scheme.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <div className="mb-6 space-y-3">
        <label className={`flex items-center space-x-3 cursor-pointer`}>
          <input
            type="checkbox"
            checked={includeCharts}
            onChange={(e) => setIncludeCharts(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Include Charts & Visualizations (Pie Charts, Bar Charts, Radar Charts)
          </span>
        </label>
        <label className={`flex items-center space-x-3 cursor-pointer`}>
          <input
            type="checkbox"
            checked={includeAnimations}
            onChange={(e) => setIncludeAnimations(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Include Animations (Dynamic chart animations)
          </span>
        </label>
        <label className={`flex items-center space-x-3 cursor-pointer`}>
          <input
            type="checkbox"
            checked={includeDetails}
            onChange={(e) => setIncludeDetails(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Include Detailed Assessment Results
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition flex items-center justify-center space-x-2 ${
            isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader className="animate-spin" size={20} />
              <span>Generating Advanced Report...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>Generate Advanced {downloadFormat.toUpperCase()}</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            const shareData = {
              title: 'My Advanced Career Analysis Report',
              text: `Check out my career analysis! Score: ${dataToUse.careerAnalysis.overallScore}/100`,
              url: window.location.href
            };
            if (navigator.share) {
              navigator.share(shareData);
            } else {
              navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
              alert('Report link copied to clipboard!');
            }
          }}
          className={`px-4 py-3 rounded-lg font-medium transition flex items-center justify-center space-x-2 ${
            isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>

      {/* Report Features */}
      <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          🚀 Advanced Report Features
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            '✨ Professional formatting with custom styles',
            '📊 Interactive pie charts & bar graphs',
            '🎯 Personality radar charts',
            '🎨 Custom color schemes (Blue/Purple/Green)',
            '📱 Mobile-friendly responsive design',
            '⚡ Animated chart visualizations',
            '📋 Detailed assessment breakdowns',
            '🎓 Learning path recommendations',
            '💡 Priority-based suggestions',
            '📈 Career match visualizations',
            '🔍 Skills gap analysis charts',
            '💼 Industry-specific insights'
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={16} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedReportDownloader;
