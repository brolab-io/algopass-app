export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      social_links: {
        Row: {
          created_at: string;
          id: number;
          title: string | null;
          url: string;
          wallet: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          title?: string | null;
          url: string;
          wallet?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          title?: string | null;
          url?: string;
          wallet?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "social_links_wallet_fkey";
            columns: ["wallet"];
            referencedRelation: "user";
            referencedColumns: ["wallet"];
          }
        ];
      };
      user: {
        Row: {
          avatar: string | null;
          bio: string | null;
          cover: string | null;
          created_at: string;
          display_name: string;
          username: string | null;
          wallet: string;
        };
        Insert: {
          avatar?: string | null;
          bio?: string | null;
          cover?: string | null;
          created_at?: string;
          display_name: string;
          username?: string | null;
          wallet: string;
        };
        Update: {
          avatar?: string | null;
          bio?: string | null;
          cover?: string | null;
          created_at?: string;
          display_name?: string;
          username?: string | null;
          wallet?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
