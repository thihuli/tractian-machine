export interface User {
  id: number
  email: string
  name: string
  unitId: number
  companyId: number
}

export interface Company {
  id: number
  name: string
}

export interface Unit {
  id: number
  name: string
  companyId: number
}