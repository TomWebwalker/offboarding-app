export interface Employee {
  id: string;
  name: string;
  department: string;
  status: 'ACTIVE' | 'OFFBOARDED';
  email: string;
  equipments: {
    id: string;
    name: string;
  }[];
}
