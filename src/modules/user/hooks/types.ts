import { Level } from 'types/user'

export type Faculty = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type Course = {
  id: string
  name: string
  departmentId: string
  level: Level
}

export type Department = {
  id: string
  name: string
  type: DepartmentType
  facultyId: string
}

export enum DepartmentType {
  DEPARTMENT = 'DEPARTMENT',
  AGENCY = 'AGENCY',
}
