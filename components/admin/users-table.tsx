import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Edit, Trash2, UserCheck, UserX } from 'lucide-react'

const users = [
  {
    id: 1,
    name: "Dr. Jane Wanjiku",
    email: "jane.wanjiku@kalro.org",
    role: "Editor",
    status: "Active",
    lastLogin: "2024-01-15",
    documents: 12
  },
  {
    id: 2,
    name: "Prof. Samuel Kiprotich",
    email: "samuel.kiprotich@kalro.org",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-14",
    documents: 8
  },
  {
    id: 3,
    name: "Dr. Mary Njoroge",
    email: "mary.njoroge@kalro.org",
    role: "Contributor",
    status: "Inactive",
    lastLogin: "2024-01-10",
    documents: 5
  },
  {
    id: 4,
    name: "Dr. Peter Mwangi",
    email: "peter.mwangi@kalro.org",
    role: "Editor",
    status: "Active",
    lastLogin: "2024-01-13",
    documents: 15
  }
]

export function UsersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Documents</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder-user-${user.id}.jpg`} alt={user.name} />
                  <AvatarFallback className="bg-[#007A33] text-white text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge 
                variant={user.role === 'Admin' ? 'default' : 'secondary'}
                className={user.role === 'Admin' ? 'bg-[#007A33] text-white' : ''}
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge 
                variant={user.status === 'Active' ? 'default' : 'secondary'}
                className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.documents}</TableCell>
            <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className={user.status === 'Active' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}>
                  {user.status === 'Active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
