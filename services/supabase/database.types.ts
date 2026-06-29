export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      care_group_invite_acceptances: {
        Row: {
          accepted_at: string
          accepted_by: string
          id: string
          invite_id: string
        }
        Insert: {
          accepted_at?: string
          accepted_by: string
          id?: string
          invite_id: string
        }
        Update: {
          accepted_at?: string
          accepted_by?: string
          id?: string
          invite_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_group_invite_acceptances_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_group_invite_acceptances_invite_id_fkey"
            columns: ["invite_id"]
            isOneToOne: false
            referencedRelation: "care_group_invites"
            referencedColumns: ["id"]
          },
        ]
      }
      care_group_invites: {
        Row: {
          created_at: string
          expires_at: string | null
          group_id: string
          id: string
          inviter_id: string
          status: Database["public"]["Enums"]["group_invite_status"]
          token_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          group_id: string
          id?: string
          inviter_id: string
          status?: Database["public"]["Enums"]["group_invite_status"]
          token_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          group_id?: string
          id?: string
          inviter_id?: string
          status?: Database["public"]["Enums"]["group_invite_status"]
          token_hash?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_group_invites_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "care_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_group_invites_inviter_id_fkey"
            columns: ["inviter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_group_member_relations: {
        Row: {
          created_at: string
          group_id: string
          id: string
          relation_name: string
          target_person_id: string
          updated_at: string
          viewer_person_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          relation_name: string
          target_person_id: string
          updated_at?: string
          viewer_person_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          relation_name?: string
          target_person_id?: string
          updated_at?: string
          viewer_person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_group_member_relations_group_id_target_person_id_fkey"
            columns: ["group_id", "target_person_id"]
            isOneToOne: false
            referencedRelation: "care_group_members"
            referencedColumns: ["group_id", "person_id"]
          },
          {
            foreignKeyName: "care_group_member_relations_group_id_viewer_person_id_fkey"
            columns: ["group_id", "viewer_person_id"]
            isOneToOne: false
            referencedRelation: "care_group_members"
            referencedColumns: ["group_id", "person_id"]
          },
        ]
      }
      care_group_members: {
        Row: {
          created_at: string
          group_id: string
          id: string
          person_id: string
          role: Database["public"]["Enums"]["group_member_role"]
          status: Database["public"]["Enums"]["group_member_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          person_id: string
          role?: Database["public"]["Enums"]["group_member_role"]
          status?: Database["public"]["Enums"]["group_member_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          person_id?: string
          role?: Database["public"]["Enums"]["group_member_role"]
          status?: Database["public"]["Enums"]["group_member_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "care_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_group_members_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      care_groups: {
        Row: {
          created_at: string
          icon_key: string | null
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon_key?: string | null
          id?: string
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon_key?: string | null
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_groups_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_note_group_shares: {
        Row: {
          created_at: string
          group_id: string
          id: string
          note_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          note_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          note_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_note_group_shares_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "care_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_note_group_shares_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "medical_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_notes: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          note_date: string
          status: Database["public"]["Enums"]["medical_note_status"]
          subject_person_id: string
          title: string | null
          updated_at: string
          visit_place: string | null
        }
        Insert: {
          author_id: string
          body?: string
          created_at?: string
          id?: string
          note_date?: string
          status?: Database["public"]["Enums"]["medical_note_status"]
          subject_person_id: string
          title?: string | null
          updated_at?: string
          visit_place?: string | null
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          note_date?: string
          status?: Database["public"]["Enums"]["medical_note_status"]
          subject_person_id?: string
          title?: string | null
          updated_at?: string
          visit_place?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_notes_subject_person_id_fkey"
            columns: ["subject_person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          created_at: string
          id: string
          linked_profile_id: string | null
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          linked_profile_id?: string | null
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          linked_profile_id?: string | null
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "people_linked_profile_id_fkey"
            columns: ["linked_profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_care_group_invite: {
        Args: { target_token_hash: string }
        Returns: string
      }
      can_access_person: {
        Args: { target_person_id: string }
        Returns: boolean
      }
      can_view_note: { Args: { target_note_id: string }; Returns: boolean }
      create_care_group: {
        Args: { target_icon_key?: string; target_name: string }
        Returns: string
      }
      current_user_person_id: { Args: never; Returns: string }
      ensure_current_user_person: { Args: never; Returns: string }
      group_has_person: {
        Args: { target_group_id: string; target_person_id: string }
        Returns: boolean
      }
      is_active_group_member: {
        Args: { target_group_id: string }
        Returns: boolean
      }
      is_group_owner: { Args: { target_group_id: string }; Returns: boolean }
      is_note_author: { Args: { target_note_id: string }; Returns: boolean }
    }
    Enums: {
      group_invite_status: "active" | "revoked" | "expired"
      group_member_role: "owner" | "member"
      group_member_status: "active"
      medical_note_status: "draft" | "saved"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      group_invite_status: ["active", "revoked", "expired"],
      group_member_role: ["owner", "member"],
      group_member_status: ["active"],
      medical_note_status: ["draft", "saved"],
    },
  },
} as const
