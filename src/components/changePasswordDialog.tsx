"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"
import { Lock, Eye, EyeOff } from "lucide-react"

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { toast } = useToast()

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nová hesla se neshodují.",
      })
      return
    }

    const token = document.cookie.split("; ").find(row => row.startsWith("token"));

    if (token) {
      const tokenValue = token.split("=")[1];
      fetch("https://preview.zushm.cz/api/users/changepassword", {
        method: "POST",
        headers: {
          "Authorization": tokenValue,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Password changed successfully") {
            toast({
              title: "Heslo změněno",
              description: "Vaše heslo bylo úspěšně změněno.",
            });
            console.log("Password changed successfully!");
          } else {
            console.error("Failed to change password:", data.message);
            toast({
              variant: "destructive",
              title: "Chyba",
              description: "Chyba při změně hesla.",
            });
          }
        })
        .catch(error => {
          console.error("Error changing password", error);
          toast({
            variant: "destructive",
            title: "Chyba",
            description: "Chyba při změně hesla.",
          });
        });
    } else {
      console.error("No token found");
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Chyba při změně hesla.",
      });
    }

    // Reset form and close dialog
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Změnit heslo</DialogTitle>
          <DialogDescription className="text-center">
            Zadejte své současné heslo a nové heslo, které chcete použít.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePasswordChange}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Současné heslo</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">Nové heslo</Label>
              <div className="relative flex items-center">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="link"
                  className="absolute right-2 text-xl"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Potvrďte nové heslo</Label>
              <div className="relative flex items-center">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="link"
                  className="absolute right-2 text-xl"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Zrušit
            </Button>
            <Button type="submit">Změnit heslo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}