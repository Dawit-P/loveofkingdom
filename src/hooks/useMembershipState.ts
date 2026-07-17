import { useState, useEffect } from 'react';
import { Partner, Member } from '../types';

const STORAGE_KEY_PARTNERS = 'kohl_partners_state_v1';
const STORAGE_KEY_MEMBERS = 'kohl_members_state_v1';

const INITIAL_PARTNERS: Partner[] = [];
const INITIAL_MEMBERS: Member[] = [];

const MOCK_NAMES = [
  'Abebe Bikila',
  'Sara Tadesse',
  'Dawit Mekonnen',
  'Hanna Alemu',
  'Evangelist Yosef Kebede',
  'Meron Solomon',
  'Samuel Girma',
];

const cleanList = <T extends { id: string; fullName: string }>(list: T[]): T[] => {
  if (!Array.isArray(list)) return [];
  return list.filter(
    (item) =>
      !MOCK_NAMES.includes(item.fullName) &&
      !['partner-1', 'partner-2', 'partner-3', 'partner-4', 'member-1', 'member-2', 'member-3'].includes(item.id)
  );
};

export function useMembershipState() {
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PARTNERS);
    if (saved) {
      try {
        return cleanList(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load partners', e);
      }
    }
    return INITIAL_PARTNERS;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MEMBERS);
    if (saved) {
      try {
        return cleanList(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load members', e);
      }
    }
    return INITIAL_MEMBERS;
  });

  useEffect(() => {
    // 1. Fetch from cloud on mount and purge any legacy mock data
    fetch('/api/partners')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data && Array.isArray(data.data)) {
          const cleaned = cleanList(data.data);
          setPartners(cleaned);
          localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(cleaned));
        }
      })
      .catch(() => {});

    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data && Array.isArray(data.data)) {
          const cleaned = cleanList(data.data);
          setMembers(cleaned);
          localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(cleaned));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(partners));
    fetch('/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partners),
    }).catch(() => {});
  }, [partners]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
    fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(members),
    }).catch(() => {});
  }, [members]);

  const addPartner = (newPartnerData: Omit<Partner, 'id' | 'dateRegistered' | 'status'>): Partner => {
    const newPartner: Partner = {
      ...newPartnerData,
      id: `partner-${Date.now()}`,
      dateRegistered: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setPartners((prev) => [newPartner, ...prev]);
    return newPartner;
  };

  const updatePartnerStatus = (id: string, status: 'Active' | 'Pending') => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    fetch(`/api/partners?id=${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {});
  };

  const addMember = (newMemberData: Omit<Member, 'id' | 'dateRegistered' | 'status'>): Member => {
    const newMember: Member = {
      ...newMemberData,
      id: `member-${Date.now()}`,
      dateRegistered: new Date().toISOString().split('T')[0],
      status: 'Active',
    };
    setMembers((prev) => [newMember, ...prev]);
    return newMember;
  };

  const updateMemberStatus = (id: string, status: any) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    fetch(`/api/members?id=${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {});
  };

  return {
    partners,
    members,
    addPartner,
    updatePartnerStatus,
    deletePartner,
    addMember,
    updateMemberStatus,
    deleteMember,
  };
}
