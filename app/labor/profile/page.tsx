"use client"

import { useState } from "react"
import { LaborLayout } from "@/layouts/labor-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form-input"
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react"

export default function ProfilePage() {
  const [profile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    position: "Field Worker",
    joinDate: "2024-01-15",
    department: "Operations",
    address: "123 Main Street, City",
    city: "City",
    state: "State",
    pincode: "123456",
  })

  const [isEditing, setIsEditing] = useState(false)

  return (
    <LaborLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="mt-2 text-muted-foreground">Manage your personal information.</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
        </div>

        <Card className="p-8">
          <div className="flex items-start gap-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.position}</p>
              <p className="mt-1 text-sm text-muted-foreground">{profile.department} Department</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Personal Information</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Mail className="h-4 w-4" />
                Email
              </label>
              {isEditing ? (
                <FormInput label="Email" type="email" placeholder={profile.email} />
              ) : (
                <p className="text-foreground">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Phone className="h-4 w-4" />
                Phone
              </label>
              {isEditing ? (
                <FormInput label="Phone" placeholder={profile.phone} />
              ) : (
                <p className="text-foreground">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Join Date
              </label>
              <p className="text-foreground">{profile.joinDate}</p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Position
              </label>
              <p className="text-foreground">{profile.position}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Address Information</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <FormInput label="Address" value={profile.address} disabled />
            <FormInput label="City" value={profile.city} disabled />
            <FormInput label="State" value={profile.state} disabled />
            <FormInput label="Pincode" value={profile.pincode} disabled />
          </div>
        </Card>

        {isEditing && (
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </div>
        )}
      </div>
    </LaborLayout>
  )
}
