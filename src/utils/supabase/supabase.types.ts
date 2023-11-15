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
      algopass: {
        Row: {
          bio: string
          created_at: string
          id: string
          name: string
          urls: Json
          wallet: string
        }
        Insert: {
          bio: string
          created_at?: string
          id?: string
          name: string
          urls: Json
          wallet: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          name?: string
          urls?: Json
          wallet?: string
        }
        Relationships: []
      }
      launchpads: {
        Row: {
          affiliate: number | null
          campaign_type: string
          created_at: string
          created_by: string
          currency_address: string
          id: string
          launch_pool_pda: string
          maximum_token_amount: string
          minimum_token_amount: string
          name: string | null
          network: string | null
          presale_rate: string
          project_banner_url: string
          project_category: string
          project_description: string
          project_email: string
          project_logo_url: string
          project_website: string | null
          slug: string | null
          token_address: string
          token_decimals: number
          token_sale_amount: string
          token_symbol: string
          token_unlock_date: string
        }
        Insert: {
          affiliate?: number | null
          campaign_type: string
          created_at?: string
          created_by: string
          currency_address: string
          id?: string
          launch_pool_pda: string
          maximum_token_amount: string
          minimum_token_amount: string
          name?: string | null
          network?: string | null
          presale_rate: string
          project_banner_url: string
          project_category: string
          project_description: string
          project_email: string
          project_logo_url: string
          project_website?: string | null
          slug?: string | null
          token_address: string
          token_decimals?: number
          token_sale_amount: string
          token_symbol: string
          token_unlock_date: string
        }
        Update: {
          affiliate?: number | null
          campaign_type?: string
          created_at?: string
          created_by?: string
          currency_address?: string
          id?: string
          launch_pool_pda?: string
          maximum_token_amount?: string
          minimum_token_amount?: string
          name?: string | null
          network?: string | null
          presale_rate?: string
          project_banner_url?: string
          project_category?: string
          project_description?: string
          project_email?: string
          project_logo_url?: string
          project_website?: string | null
          slug?: string | null
          token_address?: string
          token_decimals?: number
          token_sale_amount?: string
          token_symbol?: string
          token_unlock_date?: string
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
