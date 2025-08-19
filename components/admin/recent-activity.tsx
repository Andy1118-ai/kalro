import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Edit, Trash2, UserPlus, FileText, LogIn } from 'lucide-react'
import { useActivityLogs } from '@/hooks/use-api'

const actionToIcon: Record<string, any> = {
  document_upload: Upload,
  document_update: Edit,
  document_delete: Trash2,
  user_register: UserPlus,
  user_login: LogIn,
}

export function RecentActivity() {
  const { data, loading, error } = useActivityLogs({ limit: 10 })
  const activities = (data ?? []) as any[]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#007A33]">Recent Activity</CardTitle>
        <CardDescription>Latest actions in the system</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <div>Loading activity...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && activities.length === 0 && (
          <div className="text-sm text-gray-600">No activity yet.</div>
        )}
        {!loading && activities.length > 0 && (
          <div className="space-y-4">
            {activities.map((activity: any) => {
              const Icon = actionToIcon[activity.action] || FileText
              const color = activity.action?.includes('delete') ? 'text-red-600' : activity.action?.includes('upload') ? 'text-green-600' : 'text-blue-600'
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full bg-gray-100`}>
                    <Icon className={`h-3 w-3 ${color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">User #{activity.user_id ?? '—'}</span>{' '}
                      {activity.action?.replace(/_/g, ' ')}{' '}
                      {activity.details?.title && (
                        <span className="font-medium">{activity.details.title}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-600">{new Date(activity.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
