import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Check if we have real Supabase credentials
const hasRealCredentials = process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = hasRealCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://demo.supabase.co', 'demo-key');

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          profile_image: string | null;
          provider: 'email' | 'google' | 'github' | 'linkedin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          profile_image?: string | null;
          provider: 'email' | 'google' | 'github' | 'linkedin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          profile_image?: string | null;
          provider?: 'email' | 'google' | 'github' | 'linkedin';
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          skills: string[];
          interests: string[];
          career_goal: string;
          education: string;
          experience: string;
          bio: string | null;
          location: string | null;
          website: string | null;
          linkedin: string | null;
          github: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skills?: string[];
          interests?: string[];
          career_goal?: string;
          education?: string;
          experience?: string;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          linkedin?: string | null;
          github?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skills?: string[];
          interests?: string[];
          career_goal?: string;
          education?: string;
          experience?: string;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          linkedin?: string | null;
          github?: string | null;
          updated_at?: string;
        };
      };
      analysis_reports: {
        Row: {
          id: string;
          user_id: string;
          type: 'resume' | 'survey' | 'career';
          score: number;
          data_json: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'resume' | 'survey' | 'career';
          score: number;
          data_json: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'resume' | 'survey' | 'career';
          score?: number;
          data_json?: any;
          updated_at?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          metadata: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          metadata?: any;
          created_at?: string;
        };
      };
    };
    Functions: {
      get_user_profile: {
        Args: {
          user_id: string;
        };
        Returns: {
          user: Database['public']['Tables']['users']['Row'];
          profile: Database['public']['Tables']['user_profiles']['Row'];
        };
      };
      save_analysis_report: {
        Args: {
          user_id: string;
          type: 'resume' | 'survey' | 'career';
          score: number;
          data_json: any;
        };
        Returns: Database['public']['Tables']['analysis_reports']['Row'];
      };
    };
  };
}

export type Tables = Database['public']['Tables'];
export type Functions = Database['public']['Functions'];
