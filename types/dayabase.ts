export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          slug: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          slug?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          slug?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          username: string | null
        }
        Insert: {
          id: string
          username?: string | null
        }
        Update: {
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      training_plan: {
        Row: {
          created_at: string
          friday: string[] | null
          id: string
          monday: string[] | null
          saturday: string[] | null
          sunday: string[] | null
          thursday: string[] | null
          tuesday: string[] | null
          user_id: string | null
          wednesday: string[] | null
        }
        Insert: {
          created_at?: string
          friday?: string[] | null
          id?: string
          monday?: string[] | null
          saturday?: string[] | null
          sunday?: string[] | null
          thursday?: string[] | null
          tuesday?: string[] | null
          user_id?: string | null
          wednesday?: string[] | null
        }
        Update: {
          created_at?: string
          friday?: string[] | null
          id?: string
          monday?: string[] | null
          saturday?: string[] | null
          sunday?: string[] | null
          thursday?: string[] | null
          tuesday?: string[] | null
          user_id?: string | null
          wednesday?: string[] | null
        }
        Relationships: []
      }
      user_exercises: {
        Row: {
          created_at: string
          id: string
          instructions: string | null
          name: string
          repetitions: number | null
          sets: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          instructions?: string | null
          name: string
          repetitions?: number | null
          sets?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          instructions?: string | null
          name?: string
          repetitions?: number | null
          sets?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_workouts: {
        Row: {
          created_at: string
          desc: string | null
          exercises: string[] | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          desc?: string | null
          exercises?: string[] | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          desc?: string | null
          exercises?: string[] | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

