import { useState, useEffect } from 'react';
import { Partner, Member } from '../types';

const STORAGE_KEY_PARTNERS = 'kohl_partners_state_v1';
const STORAGE_KEY_MEMBERS = 'kohl_members_state_v1';

const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'partner-1',
    fullName: 'Abebe Bikila',
    phone: '+251 911 234 567',
    email: 'abebe.b@gmail.com',
    city: 'Addis Ababa',
    tier: 'Platinum',
    monthlyAmountRange: '10,000 - 100,000+ ETB / month',
    paymentMethod: 'CBE',
    dateRegistered: '2026-07-10',
    status: 'Active',
  },
  {
    id: 'partner-2',
    fullName: 'Sara Tadesse',
    phone: '+251 912 876 543',
    email: 'sara.t@yahoo.com',
    city: 'Hawassa',
    tier: 'Diamond',
    monthlyAmountRange: '5,000 - 9,900 ETB / month',
    paymentMethod: 'Dashen',
    dateRegistered: '2026-07-11',
    status: 'Active',
  },
  {
    id: 'partner-3',
    fullName: 'Dawit Mekonnen',
    phone: '+251 913 456 789',
    city: 'Adama',
    tier: 'Gold',
    monthlyAmountRange: '1,000 - 4,900 ETB / month',
    paymentMethod: 'Telebirr',
    dateRegistered: '2026-07-12',
    status: 'Pending',
  },
  {
    id: 'partner-4',
    fullName: 'Hanna Alemu',
    phone: '+251 914 321 654',
    email: 'hanna.a@gmail.com',
    city: 'Bahir Dar',
    tier: 'Silver',
    monthlyAmountRange: '500 - 900 ETB / month',
    paymentMethod: 'CBE',
    dateRegistered: '2026-07-12',
    status: 'Active',
  },
];

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'member-1',
    fullName: 'Evangelist Yosef Kebede',
    phone: '+251 922 112 233',
    email: 'yosef.k@gospel.org',
    city: 'Addis Ababa',
    ministryArea: 'Evangelism & Preaching',
    statement: 'I feel called to plant fellowship groups across Bole and Kazanchis to share Kingdom of His Love disclosures.',
    dateRegistered: '2026-07-09',
    status: 'Approved',
  },
  {
    id: 'member-2',
    fullName: 'Meron Solomon',
    phone: '+251 933 445 566',
    email: 'merons@gmail.com',
    city: 'Hawassa',
    ministryArea: 'Worship & Choir',
    statement: 'I am a worship leader eager to join the national choir team and minister in youth conferences.',
    dateRegistered: '2026-07-11',
    status: 'Approved',
  },
  {
    id: 'member-3',
    fullName: 'Samuel Girma',
    phone: '+251 944 778 899',
    city: 'Adama',
    ministryArea: 'Intercessory Prayer',
    statement: 'Standing in the gap for the global prayer shield and supporting intercessory altars in Oromia region.',
    dateRegistered: '2026-07-12',
    status: 'Active',
  },
];

export function useMembershipState() {
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PARTNERS);
    if (saved) {
      try {
        return JSON.parse(saved);
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
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load members', e);
      }
    }
    return INITIAL_MEMBERS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
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
