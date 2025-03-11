"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useToast } from "../../components/ui/use-toast";
import { Key, Plus, Trash2 } from "lucide-react";
import Sidebar from "./sidebar";

interface User {
  id: string;
  name: string;
  password: string;
}

const UzivatelePage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const fetchUserData = async () => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token"));

    try {
      const tokenValue = token?.split("=")[1] ?? "";
      const headers: HeadersInit = tokenValue ? { Authorization: tokenValue } : {};

      const response = await fetch("https://preview.zushm.cz/api/users/", {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Define the type for user item
      const formattedUsers: User[] = data
        .map((item: any) => ({
          id: String(item.id), // Store ID as string
          name: item.username, // Use correct field for name
          password: item.permissions === "admin" ? "Ano" : "Ne", // Check admin status
        }))
        .sort((a: User, b: User) => a.name.localeCompare(b.name)); // Sort alphabetically by username

      console.log("Fetched users (sorted):", formattedUsers);
      setUsers(formattedUsers);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const { toast } = useToast();

  const handleCreateUser = (event: React.FormEvent) => {
    event.preventDefault();

    const token = document.cookie.split("; ").find(row => row.startsWith("token"));

    if (token) {
      const tokenValue = token.split("=")[1];

      fetch("https://preview.zushm.cz/api/users/create", {
        method: "POST",
        headers: {
          "Authorization": tokenValue,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUser.name,
          password: newUser.password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "User created successfully") {
            toast({
              title: "Úspěch",
              description: "Uživatel byl úspěšně vytvořen.",
            });
            setNewUser({ name: "", password: "" }); // Reset newUser state
            setIsCreateDialogOpen(false);
            fetchUserData();
          } else {
            console.error("Failed to create user:", data.message);
            toast({
              title: "Neúspěch",
              description: "Uživatel nebyl vytvořen.",
              variant: "destructive",
            });
            fetchUserData();
          }
        })
        .catch(error => {
          console.error("Error creating user", error);
          toast({
            title: "Neúspěch",
            description: "Uživatel nebyl vytvořen.",
            variant: "destructive",
          });
          fetchUserData();
        });
    } else {
      console.error("No token found");
      toast({
        title: "Neúspěch",
        description: "Nejste přihlášeni.",
        variant: "destructive",
      });
      fetchUserData();
    }
    fetchUserData();
  };

  const handleDeleteUser = (event: React.FormEvent) => {
    event.preventDefault();

    const token = document.cookie.split("; ").find(row => row.startsWith("token"));

    if (token) {
      const tokenValue = token.split("=")[1];

      fetch("https://preview.zushm.cz/api/users/delete", {
        method: "POST",
        headers: {
          "Authorization": tokenValue,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUser?.name, // Use the name of the currently selected user
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "User deleted successfully") {
            toast({
              title: "Úspěch",
              description: "Uživatel byl úspěšně smazán.",
            });
            setUsers(users.filter(user => user.id !== currentUser?.id)); // Remove user from the state
            setIsDeleteDialogOpen(false); // Close the delete dialog
          } else {
            console.error("Failed to delete user:", data.message);
            toast({
              title: "Neúspěch",
              description: "Uživatel nebyl smazán.",
              variant: "destructive",
            });
          }
        })
        .catch(error => {
          console.error("Error deleting user", error);
          toast({
            title: "Neúspěch",
            description: "Uživatel nebyl smazán.",
            variant: "destructive",
          });
        });
    } else {
      console.error("No token found");
      toast({
        title: "Neúspěch",
        description: "Nejste přihlášeni.",
        variant: "destructive",
      });
    }
    fetchUserData();
  };

  const handleChangePassword = () => {
    if (currentUser) {
      const token = document.cookie.split("; ").find(row => row.startsWith("token"));

      if (token) {
        const tokenValue = token.split("=")[1];

        fetch("https://preview.zushm.cz/api/users/changepasswordadmin", {
          method: "POST",
          headers: {
            "Authorization": tokenValue,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(currentUser.id), // Use the current user's ID
            newpass: newPassword, // Use the new password from the input field
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.message === "Password changed successfully") {
              toast({
                title: "Úspěch",
                description: "Heslo bylo úspěšně změněno.",
              });
              setNewPassword(""); // Reset newPassword state
              setIsChangePasswordDialogOpen(false);
            } else {
              console.error("Failed to change password:", data.message);
              toast({
                title: "Neúspěch",
                description: "Heslo nebylo změněno.",
                variant: "destructive",
              });
            }
          })
          .catch(error => {
            console.error("Error changing password", error);
            toast({
              title: "Neúspěch",
              description: "Heslo nebylo změněno.",
              variant: "destructive",
            });
          });
      } else {
        console.error("No token found");
        toast({
          title: "Neúspěch",
          description: "Nejste přihlášeni.",
          variant: "destructive",
        });
      }
    }
    setIsChangePasswordDialogOpen(false)
    fetchUserData();
  };

  const openDeleteDialog = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const openChangePasswordDialog = (user: User) => {
    setCurrentUser(user);
    setIsChangePasswordDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Uživatelé</h1>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Přidat uživatele
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Seznam uživatelů</CardTitle>
              <CardDescription>Správa uživatelských účtů a přístupů</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jméno</TableHead>
                    <TableHead>Administrátor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="ml-1">{user.password}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openChangePasswordDialog(user)}>
                            <Key className="mr-2 h-4 w-4" />
                            Změnit heslo
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(user)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Přidat uživatele</DialogTitle>
                <DialogDescription>Vytvořte nového uživatele v systému.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Jméno
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name || ""}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Heslo
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password || ""}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleCreateUser}>
                  Vytvořit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Smazat uživatele</DialogTitle>
                <DialogDescription>Opravdu chcete smazat tohoto uživatele? Tato akce je nevratná.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button" variant="destructive" onClick={handleDeleteUser}>
                  Smazat
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Změnit heslo</DialogTitle>
                <DialogDescription>Zadejte nové heslo pro tohoto uživatele.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newPassword" className="text-right">
                    Nové heslo
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleChangePassword}>
                  Změnit heslo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UzivatelePage;