export interface MockUser {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: "student" | "teacher" | "admin"
  avatar?: string
}

export const mockUsers: MockUser[] = [
  // Étudiants
  {
    id: "1",
    email: "etudiant@epg.com",
    password: "password123",
    firstName: "Marie",
    lastName: "Dubois",
    role: "student",
    avatar: "/student-avatar.png",
  },
  {
    id: "2",
    email: "student@epg.com",
    password: "password123",
    firstName: "Thomas",
    lastName: "Martin",
    role: "student",
    avatar: "/male-student-avatar.png",
  },

  // Enseignants
  {
    id: "3",
    email: "enseignant@epg.com",
    password: "password123",
    firstName: "Sophie",
    lastName: "Leclerc",
    role: "teacher",
    avatar: "/teacher-avatar.png",
  },
  {
    id: "4",
    email: "teacher@epg.com",
    password: "password123",
    firstName: "Pierre",
    lastName: "Rousseau",
    role: "teacher",
    avatar: "/male-teacher-avatar.png",
  },

  // Administrateurs
  {
    id: "5",
    email: "admin@epg.com",
    password: "password123",
    firstName: "Catherine",
    lastName: "Moreau",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
  {
    id: "6",
    email: "administrateur@epg.com",
    password: "password123",
    firstName: "Jean",
    lastName: "Bernard",
    role: "admin",
    avatar: "/male-admin-avatar.png",
  },
]

export const findUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find((user) => user.email === email)
}

export const authenticateUser = (email: string, password: string): MockUser | null => {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}
