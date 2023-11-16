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
          friday: string | null
          id: number
          monday: string | null
          saturday: string | null
          sunday: string | null
          thursday: string | null
          tuesday: string | null
          user_id: string | null
          wednesday: string | null
        }
        Insert: {
          created_at?: string
          friday?: string | null
          id?: number
          monday?: string | null
          saturday?: string | null
          sunday?: string | null
          thursday?: string | null
          tuesday?: string | null
          user_id?: string | null
          wednesday?: string | null
        }
        Update: {
          created_at?: string
          friday?: string | null
          id?: number
          monday?: string | null
          saturday?: string | null
          sunday?: string | null
          thursday?: string | null
          tuesday?: string | null
          user_id?: string | null
          wednesday?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_plan_friday_fkey"
            columns: ["friday"]
            referencedRelation: "user_workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_plan_monday_fkey"
            columns: ["monday"]
            referencedRelation: "user_workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_plan_saturday_fkey"
            columns: ["saturday"]
            referencedRelation: "user_workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_plan_sunday_fkey"
            columns: ["sunday"]
            referencedRelation: "user_workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_plan_thursday_fkey"
            columns: ["thursday"]
            referencedRelation: "user_workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_plan_tuesday_fkey"
            columns: ["tuesday"]
            referencedRelation: "user_workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_plan_wednesday_fkey"
            columns: ["wednesday"]
            referencedRelation: "user_workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      user_exercises: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          repetitions: number | null
          sets: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          repetitions?: number | null
          sets?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          repetitions?: number | null
          sets?: number | null
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
        }
        Insert: {
          created_at?: string
          desc?: string | null
          exercises?: string[] | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          desc?: string | null
          exercises?: string[] | null
          id?: string
          name?: string | null
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

