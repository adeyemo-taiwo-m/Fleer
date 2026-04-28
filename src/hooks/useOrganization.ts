'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Organization } from '../types';

interface OrgUser {
  email: string;
  id: string;
}

export function useOrganization() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [user, setUser] = useState<OrgUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ email: session.user.email!, id: session.user.id });
        // Fetch organization for this user
        supabase
          .from('organizations')
          .select('*')
          .single()
          .then(({ data }) => {
            setOrg(data);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email!, id: session.user.id });
      } else {
        setUser(null);
        setOrg(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { org, user, isLoading, logout };
}
