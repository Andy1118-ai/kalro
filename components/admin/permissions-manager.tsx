"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Users, Edit, Trash2, Plus, Check, X } from 'lucide-react'
import { useState } from "react"

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access and control",
    users: 2,
    permissions: {
      documents: { create: true, read: true, update: true, delete: true },
      users: { create: true, read: true, update: true, delete: true },
      categories: { create: true, read: true, update: true, delete: true },
      analytics: { read: true, export: true },
      settings: { read: true, update: true },
      bulk: { upload: true, delete: true, export: true }
    }
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access with some restrictions",
    users: 5,
    permissions: {
      documents: { create: true, read: true, update: true, delete: true },
      users: { create: true, read: true, update: true, delete: false },
      categories: { create: true, read: true, update: true, delete: false },
      analytics: { read: true, export: true },
      settings: { read: true, update: false },
      bulk: { upload: true, delete: false, export: true }
    }
  },
  {
    id: 3,
    name: "Editor",
    description: "Content management and editing",
    users: 12,
    permissions: {
      documents: { create: true, read: true, update: true, delete: false },
      users: { create: false, read: true, update: false, delete: false },
      categories: { create: false, read: true, update: false, delete: false },
      analytics: { read: true, export: false },
      settings: { read: false, update: false },
      bulk: { upload: true, delete: false, export: false }
    }
  },
  {
    id: 4,
    name: "Contributor",
    description: "Content creation and basic access",
    users: 25,
    permissions: {
      documents: { create: true, read: true, update: false, delete: false },
      users: { create: false, read: false, update: false, delete: false },
      categories: { create: false, read: true, update: false, delete: false },
      analytics: { read: false, export: false },
      settings: { read: false, update: false },
      bulk: { upload: false, delete: false, export: false }
    }
  },
  {
    id: 5,
    name: "Viewer",
    description: "Read-only access to content",
    users: 8,
    permissions: {
      documents: { create: false, read: true, update: false, delete: false },
      users: { create: false, read: false, update: false, delete: false },
      categories: { create: false, read: true, update: false, delete: false },
      analytics: { read: false, export: false },
      settings: { read: false, update: false },
      bulk: { upload: false, delete: false, export: false }
    }
  }
]

const permissionCategories = [
  { key: 'documents', name: 'Documents', description: 'Manage knowledge base content' },
  { key: 'users', name: 'Users', description: 'User account management' },
  { key: 'categories', name: 'Categories', description: 'Content categorization' },
  { key: 'analytics', name: 'Analytics', description: 'System analytics and reports' },
  { key: 'settings', name: 'Settings', description: 'System configuration' },
  { key: 'bulk', name: 'Bulk Operations', description: 'Mass operations on content' }
]

const permissionActions = [
  { key: 'create', name: 'Create', icon: Plus },
  { key: 'read', name: 'Read', icon: Check },
  { key: 'update', name: 'Update', icon: Edit },
  { key: 'delete', name: 'Delete', icon: Trash2 },
  { key: 'upload', name: 'Upload', icon: Plus },
  { key: 'export', name: 'Export', icon: Check }
]

export default function PermissionsManager() {
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const [editingPermissions, setEditingPermissions] = useState(false)

  const togglePermission = (category: string, action: string) => {
    if (!editingPermissions) return
    
    setSelectedRole(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [category]: {
          ...prev.permissions[category],
          [action]: !prev.permissions[category][action]
        }
      }
    }))
  }

  const hasPermission = (category: string, action: string) => {
    return selectedRole.permissions[category]?.[action] || false
  }

  const categoryHasAction = (category: string, action: string) => {
    return selectedRole.permissions[category]?.hasOwnProperty(action) || false
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-[#007A33]">User Permissions</h3>
          <p className="text-gray-600">Manage roles and permissions for system access</p>
        </div>
        <Button className="bg-[#007A33] hover:bg-[#006400]">
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Roles List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#007A33] flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Roles
            </CardTitle>
            <CardDescription>Select a role to manage permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRole.id === role.id 
                    ? 'border-[#007A33] bg-[#007A33]/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {role.users} users
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Permissions Matrix */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#007A33]">{selectedRole.name} Permissions</CardTitle>
                  <CardDescription>Configure permissions for this role</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingPermissions(!editingPermissions)}
                    className={editingPermissions ? "border-[#007A33] text-[#007A33]" : ""}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {editingPermissions ? 'Cancel' : 'Edit'}
                  </Button>
                  {editingPermissions && (
                    <Button className="bg-[#007A33] hover:bg-[#006400]">
                      Save Changes
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissionCategories.map((category) => (
                  <div key={category.key} className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {permissionActions.map((action) => {
                        const hasPermissionValue = hasPermission(category.key, action.key)
                        const ActionIcon = action.icon
                        
                        if (!categoryHasAction(category.key, action.key)) {
                          return null
                        }

                        return (
                          <div key={action.key} className="flex items-center space-x-2">
                            <Switch
                              checked={hasPermissionValue}
                              onCheckedChange={() => togglePermission(category.key, action.key)}
                              disabled={!editingPermissions}
                            />
                            <div className="flex items-center space-x-1">
                              <ActionIcon className="h-3 w-3 text-gray-500" />
                              <Label className="text-sm">{action.name}</Label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Users with Role */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#007A33] flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Users with {selectedRole.name} Role
          </CardTitle>
          <CardDescription>Manage users assigned to this role</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Sample users for the selected role */}
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#007A33] text-white text-xs">JW</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Dr. Jane Wanjiku</span>
                  </div>
                </TableCell>
                <TableCell>jane.wanjiku@kalro.org</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </TableCell>
                <TableCell>2024-01-15</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
