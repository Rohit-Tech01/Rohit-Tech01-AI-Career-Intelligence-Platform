import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }>;
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    title?: {
      display?: boolean;
      text?: string;
      font?: {
        size?: number;
        weight?: string;
      };
    };
  };
  scales?: {
    [key: string]: {
      beginAtZero?: boolean;
      grid?: {
        display?: boolean;
      };
      ticks?: {
        font?: {
          size?: number;
        };
      };
    };
  };
}

export class ChartUtils {
  private static readonly COLORS = {
    primary: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'],
    secondary: ['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#f87171'],
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  };

  /**
   * Create a pie chart configuration
   */
  static createPieChart(data: ChartData, title?: string): ChartConfiguration<'pie'> {
    return {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0]?.label || 'Data',
          data: data.datasets[0]?.data || [],
          backgroundColor: this.COLORS.primary.slice(0, data.labels.length),
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: !!title,
            text: title || '',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    };
  }

  /**
   * Create a bar chart configuration
   */
  static createBarChart(data: ChartData, title?: string): ChartConfiguration<'bar'> {
    return {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0]?.label || 'Data',
          data: data.datasets[0]?.data || [],
          backgroundColor: this.COLORS.primary.slice(0, data.labels.length),
          borderColor: this.COLORS.secondary.slice(0, data.labels.length),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: !!title,
            text: title || '',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          }
        }
      }
    };
  }

  /**
   * Create a horizontal bar chart configuration
   */
  static createHorizontalBarChart(data: ChartData, title?: string): ChartConfiguration<'bar'> {
    return {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0]?.label || 'Data',
          data: data.datasets[0]?.data || [],
          backgroundColor: this.COLORS.primary.slice(0, data.labels.length),
          borderColor: this.COLORS.secondary.slice(0, data.labels.length),
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: !!title,
            text: title || '',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: true
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          }
        }
      }
    };
  }

  /**
   * Create a line chart configuration
   */
  static createLineChart(data: ChartData, title?: string): ChartConfiguration<'line'> {
    return {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0]?.label || 'Data',
          data: data.datasets[0]?.data || [],
          borderColor: this.COLORS.info,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: !!title,
            text: title || '',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          }
        }
      }
    };
  }

  /**
   * Create a doughnut chart configuration
   */
  static createDoughnutChart(data: ChartData, title?: string): ChartConfiguration<'doughnut'> {
    return {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0]?.label || 'Data',
          data: data.datasets[0]?.data || [],
          backgroundColor: this.COLORS.primary.slice(0, data.labels.length),
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: !!title,
            text: title || '',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    };
  }

  /**
   * Create a radar chart configuration
   */
  static createRadarChart(data: ChartData, title?: string): ChartConfiguration<'radar'> {
    return {
      type: 'radar',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0]?.label || 'Data',
          data: data.datasets[0]?.data || [],
          borderColor: this.COLORS.info,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: this.COLORS.info,
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: this.COLORS.info
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: !!title,
            text: title || '',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            grid: {
              display: true
            },
            ticks: {
              font: {
                size: 10
              }
            }
          }
        }
      }
    };
  }

  /**
   * Render chart to canvas and convert to image
   */
  static async renderChartToImage(
    canvas: HTMLCanvasElement, 
    config: ChartConfiguration,
    width: number = 400,
    height: number = 300
  ): Promise<string> {
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Create chart
    const chart = new Chart(canvas, config);

    // Wait for chart to render
    await new Promise(resolve => setTimeout(resolve, 100));

    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png', 0.9);

    // Destroy chart to free memory
    chart.destroy();

    return dataUrl;
  }

  /**
   * Generate demographic pie chart data
   */
  static generateDemographicData(demographics: {
    gender: { male: number; female: number; other: number };
    ageDistribution: { [key: string]: number };
    experience: { [key: string]: number };
  }): { pie: ChartData; bar: ChartData } {
    return {
      pie: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
          label: 'Gender Distribution',
          data: [demographics.gender.male, demographics.gender.female, demographics.gender.other]
        }]
      },
      bar: {
        labels: Object.keys(demographics.ageDistribution),
        datasets: [{
          label: 'Age Distribution',
          data: Object.values(demographics.ageDistribution)
        }]
      }
    };
  }

  /**
   * Generate skills chart data
   */
  static generateSkillsData(skills: Array<{ name: string; level: number; importance: number }>): {
    horizontal: ChartData;
    radar: ChartData;
  } {
    return {
      horizontal: {
        labels: skills.map(skill => skill.name),
        datasets: [{
          label: 'Skill Level',
          data: skills.map(skill => skill.level)
        }]
      },
      radar: {
        labels: skills.map(skill => skill.name),
        datasets: [{
          label: 'Skills Assessment',
          data: skills.map(skill => skill.level)
        }]
      }
    };
  }

  /**
   * Generate career matches chart data
   */
  static generateCareerData(careerMatches: Array<{ title: string; match: number; salary: string }>): {
    bar: ChartData;
    horizontal: ChartData;
  } {
    return {
      bar: {
        labels: careerMatches.map(match => match.title),
        datasets: [{
          label: 'Career Match %',
          data: careerMatches.map(match => match.match)
        }]
      },
      horizontal: {
        labels: careerMatches.map(match => match.title),
        datasets: [{
          label: 'Career Match %',
          data: careerMatches.map(match => match.match)
        }]
      }
    };
  }

  /**
   * Get color based on score
   */
  static getScoreColor(score: number): string {
    if (score >= 90) return this.COLORS.success;
    if (score >= 80) return this.COLORS.info;
    if (score >= 70) return this.COLORS.warning;
    return this.COLORS.danger;
  }

  /**
   * Generate progress bar HTML
   */
  static generateProgressBar(value: number, color?: string): string {
    const barColor = color || this.getScoreColor(value);
    return `
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${value}%; background: ${barColor};"></div>
      </div>
    `;
  }

  /**
   * Generate chart placeholder for PDF
   */
  static generateChartPlaceholder(type: string, title: string, data: any): string {
    return `
      <div class="chart-container">
        <div class="chart-title">${title}</div>
        <div class="chart-placeholder" style="width: 100%; height: 200px; background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <div style="text-align: center; color: #6b7280;">
            <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
            <div style="font-size: 12px; font-weight: 600;">${type} Chart</div>
            <div style="font-size: 10px; margin-top: 4px;">Data visualization would appear here</div>
          </div>
        </div>
      </div>
    `;
  }
}

export default ChartUtils;
