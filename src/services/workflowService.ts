export enum WorkflowStep {
  LOGIN = 'login',
  SURVEY = 'survey', 
  ANALYSIS = 'analysis',
  DASHBOARD = 'dashboard'
}

export interface WorkflowState {
  currentStep: WorkflowStep;
  isCompleted: boolean;
  stepProgress: {
    [WorkflowStep.LOGIN]: boolean;
    [WorkflowStep.SURVEY]: boolean;
    [WorkflowStep.ANALYSIS]: boolean;
    [WorkflowStep.DASHBOARD]: boolean;
  };
  userJourneyStarted: boolean;
  firstLogin: boolean;
}

export interface WorkflowTransition {
  from: WorkflowStep;
  to: WorkflowStep;
  condition: () => boolean;
  action: () => void;
}

class WorkflowService {
  private static instance: WorkflowService;
  private state: WorkflowState;
  private transitions: WorkflowTransition[] = [];
  private listeners: ((state: WorkflowState) => void)[] = [];

  private constructor() {
    this.state = this.loadState();
    this.setupTransitions();
  }

  static getInstance(): WorkflowService {
    if (!WorkflowService.instance) {
      WorkflowService.instance = new WorkflowService();
    }
    return WorkflowService.instance;
  }

  private loadState(): WorkflowState {
    const savedState = localStorage.getItem('workflowState');
    if (savedState) {
      return JSON.parse(savedState);
    }
    
    // Default state - user must start with login
    return {
      currentStep: WorkflowStep.LOGIN,
      isCompleted: false,
      stepProgress: {
        [WorkflowStep.LOGIN]: false,
        [WorkflowStep.SURVEY]: false,
        [WorkflowStep.ANALYSIS]: false,
        [WorkflowStep.DASHBOARD]: false
      },
      userJourneyStarted: false,
      firstLogin: true
    };
  }

  private saveState(): void {
    localStorage.setItem('workflowState', JSON.stringify(this.state));
    this.notifyListeners();
  }

  private setupTransitions(): void {
    this.transitions = [
      {
        from: WorkflowStep.LOGIN,
        to: WorkflowStep.SURVEY,
        condition: () => this.state.stepProgress[WorkflowStep.LOGIN],
        action: () => this.transitionTo(WorkflowStep.SURVEY)
      },
      {
        from: WorkflowStep.SURVEY,
        to: WorkflowStep.ANALYSIS,
        condition: () => this.state.stepProgress[WorkflowStep.SURVEY],
        action: () => this.transitionTo(WorkflowStep.ANALYSIS)
      },
      {
        from: WorkflowStep.ANALYSIS,
        to: WorkflowStep.DASHBOARD,
        condition: () => this.state.stepProgress[WorkflowStep.ANALYSIS],
        action: () => this.transitionTo(WorkflowStep.DASHBOARD)
      }
    ];
  }

  private transitionTo(step: WorkflowStep): void {
    this.state.currentStep = step;
    this.saveState();
  }

  public subscribe(listener: (state: WorkflowState) => void): void {
    this.listeners.push(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Workflow control methods
  public startUserJourney(): void {
    this.state.userJourneyStarted = true;
    this.saveState();
  }

  public completeLogin(): void {
    this.state.stepProgress[WorkflowStep.LOGIN] = true;
    this.state.firstLogin = false;
    
    // Auto-transition to survey
    const transition = this.transitions.find(t => t.from === WorkflowStep.LOGIN);
    if (transition && transition.condition()) {
      transition.action();
    }
  }

  public completeSurvey(): void {
    this.state.stepProgress[WorkflowStep.SURVEY] = true;
    
    // Auto-transition to analysis
    const transition = this.transitions.find(t => t.from === WorkflowStep.SURVEY);
    if (transition && transition.condition()) {
      transition.action();
    }
  }

  public completeAnalysis(): void {
    this.state.stepProgress[WorkflowStep.ANALYSIS] = true;
    
    // Auto-transition to dashboard
    const transition = this.transitions.find(t => t.from === WorkflowStep.ANALYSIS);
    if (transition && transition.condition()) {
      transition.action();
    }
  }

  public completeDashboard(): void {
    this.state.stepProgress[WorkflowStep.DASHBOARD] = true;
    this.state.isCompleted = true;
    this.saveState();
  }

  // State getters
  public getCurrentStep(): WorkflowStep {
    return this.state.currentStep;
  }

  public getState(): WorkflowState {
    return { ...this.state };
  }

  public canAccessStep(step: WorkflowStep): boolean {
    switch (step) {
      case WorkflowStep.LOGIN:
        return true; // Always accessible
      case WorkflowStep.SURVEY:
        return this.state.stepProgress[WorkflowStep.LOGIN];
      case WorkflowStep.ANALYSIS:
        return this.state.stepProgress[WorkflowStep.SURVEY];
      case WorkflowStep.DASHBOARD:
        return this.state.stepProgress[WorkflowStep.ANALYSIS];
      default:
        return false;
    }
  }

  public getRequiredStep(step: WorkflowStep): WorkflowStep | null {
    switch (step) {
      case WorkflowStep.SURVEY:
        return WorkflowStep.LOGIN;
      case WorkflowStep.ANALYSIS:
        return WorkflowStep.SURVEY;
      case WorkflowStep.DASHBOARD:
        return WorkflowStep.ANALYSIS;
      default:
        return null;
    }
  }

  // Navigation enforcement
  public enforceNavigation(targetStep: WorkflowStep): WorkflowStep {
    if (this.canAccessStep(targetStep)) {
      return targetStep;
    }
    
    // Return the current step or required step
    const requiredStep = this.getRequiredStep(targetStep);
    return requiredStep || this.state.currentStep;
  }

  // Progress calculation
  public getProgressPercentage(): number {
    const completedSteps = Object.values(this.state.stepProgress).filter(Boolean).length;
    return (completedSteps / Object.keys(this.state.stepProgress).length) * 100;
  }

  public getStepNumber(): number {
    const steps = Object.values(WorkflowStep);
    return steps.indexOf(this.state.currentStep) + 1;
  }

  // Reset methods
  public resetWorkflow(): void {
    this.state = this.loadState();
    this.saveState();
  }

  public resetToStep(step: WorkflowStep): void {
    const stepIndex = Object.values(WorkflowStep).indexOf(step);
    const steps = Object.values(WorkflowStep);
    
    this.state.currentStep = step;
    
    // Reset progress for this step and all subsequent steps
    for (let i = stepIndex; i < steps.length; i++) {
      this.state.stepProgress[steps[i] as WorkflowStep] = false;
    }
    
    // Keep progress for previous steps
    for (let i = 0; i < stepIndex; i++) {
      this.state.stepProgress[steps[i] as WorkflowStep] = true;
    }
    
    this.saveState();
  }

  // Utility methods
  public isStepCompleted(step: WorkflowStep): boolean {
    return this.state.stepProgress[step];
  }

  public getNextStep(): WorkflowStep | null {
    const currentIndex = Object.values(WorkflowStep).indexOf(this.state.currentStep);
    const nextStep = Object.values(WorkflowStep)[currentIndex + 1];
    return nextStep || null;
  }

  public getPreviousStep(): WorkflowStep | null {
    const currentIndex = Object.values(WorkflowStep).indexOf(this.state.currentStep);
    const previousStep = Object.values(WorkflowStep)[currentIndex - 1];
    return previousStep || null;
  }

  // First login detection
  public isFirstLogin(): boolean {
    return this.state.firstLogin;
  }

  public hasStartedJourney(): boolean {
    return this.state.userJourneyStarted;
  }

  // Step descriptions for UI
  public getStepDescription(step: WorkflowStep): string {
    switch (step) {
      case WorkflowStep.LOGIN:
        return 'Sign in to begin your career journey';
      case WorkflowStep.SURVEY:
        return 'Complete career assessment survey';
      case WorkflowStep.ANALYSIS:
        return 'Analyze your resume with AI';
      case WorkflowStep.DASHBOARD:
        return 'View your career insights';
      default:
        return '';
    }
  }

  public getStepTitle(step: WorkflowStep): string {
    switch (step) {
      case WorkflowStep.LOGIN:
        return 'Login';
      case WorkflowStep.SURVEY:
        return 'Career Survey';
      case WorkflowStep.ANALYSIS:
        return 'Resume Analysis';
      case WorkflowStep.DASHBOARD:
        return 'Dashboard';
      default:
        return '';
    }
  }
}

export default WorkflowService;
