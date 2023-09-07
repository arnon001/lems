export const RoleTypes = [
  'judge-advisor',
  'lead-judge',
  'judge',
  'display',
  'referee',
  'head-referee',
  'scorekeeper',
  'pit-admin',
  'audience',
  'tournament-manager'
] as const;

export type Role = (typeof RoleTypes)[number];

export const RoleAssociationTypes = ['room', 'table', 'category'] as const;

export type RoleAssociationType = (typeof RoleAssociationTypes)[number];

export const getAssociationType = (role: Role): RoleAssociationType => {
  switch (role) {
    case 'lead-judge':
      return 'category';
    case 'judge':
      return 'room';
    case 'referee':
      return 'table';
  }
};
