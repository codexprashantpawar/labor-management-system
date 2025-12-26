"use client"

import type { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormInputProps {
  label: string
  type?: "text" | "email" | "password" | "number" | "date" | "select" | "textarea"
  placeholder?: string
  value?: string | number
  onChange?: (value: string) => void
  error?: string
  required?: boolean
  disabled?: boolean
  children?: ReactNode
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  children,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={label}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={error ? "border-destructive" : ""}
        />
      ) : type === "select" ? (
        <select
          id={label}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus:border-ring focus:outline-none ${
            error ? "border-destructive" : ""
          }`}
        >
          {children}
        </select>
      ) : (
        <Input
          id={label}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={error ? "border-destructive" : ""}
        />
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
