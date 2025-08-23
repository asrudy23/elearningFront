import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockUsers } from "@/lib/mock-users"

export function TestAccountsInfo() {
  const groupedUsers = {
    student: mockUsers.filter((user) => user.role === "student"),
    teacher: mockUsers.filter((user) => user.role === "teacher"),
    admin: mockUsers.filter((user) => user.role === "admin"),
  }

  const roleLabels = {
    student: "Étudiants",
    teacher: "Enseignants",
    admin: "Administrateurs",
  }

  const roleColors = {
    student: "bg-blue-100 text-blue-800",
    teacher: "bg-orange-100 text-orange-800",
    admin: "bg-red-100 text-red-800",
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold text-[#0A1F44]">
          🧪 Comptes de Test Disponibles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedUsers).map(([role, users]) => (
          <div key={role} className="space-y-3">
            <h3 className="font-medium text-[#0A1F44] flex items-center gap-2">
              <Badge className={roleColors[role as keyof typeof roleColors]}>
                {roleLabels[role as keyof typeof roleLabels]}
              </Badge>
            </h3>
            <div className="grid gap-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#0A1F44]">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded">{user.password}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="text-xs text-gray-500 text-center pt-4 border-t">
          💡 Utilisez ces comptes pour tester les différents rôles de l'application
        </div>
      </CardContent>
    </Card>
  )
}
