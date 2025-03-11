"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useToast } from "../../components/ui/use-toast"
import { Edit, Plus, Trash2 } from "lucide-react"
import Sidebar from "./sidebar"
import NoPFP from "../../data/nopfp.jpg"
import { de } from "date-fns/locale"

const DEPARTMENTS = ["hudebni", "tanecni", "vytvarny"] as const;
type Department = (typeof DEPARTMENTS)[number];

interface Employee {
  id: number;
  name: string;
  teaches: string;
  resume: string;
  department: Department;
  photo: string;
}

const ZamestnanciPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([])

  const fetchZamestnanci = async () => {
      const response = await fetch("https://preview.zushm.cz/api/zamestanci/");
      if (!response.ok) throw new Error("Failed to fetch data");
      const rawData = await response.json();

      // Process the data to match the required format
      const processedEmployees: Employee[] = rawData.map((teacher: any) => ({
        id: Number(teacher.ID),
        name: teacher.Jmeno,
        teaches: teacher.Vyucuje,
        resume: teacher.Zivotopis,
        department: teacher.Obor as Department,
        photo: teacher.Image || NoPFP,
      }));

      setEmployees(processedEmployees);
  };

  useEffect(() => {
    fetchZamestnanci();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: "",
    teaches: "",
    resume: "",
    department: "hudebni",
    photo: "",
  })
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("")

  const { toast } = useToast()

  const getDepartmentLabel = (department: Department) => {
    switch (department) {
      case "hudebni":
        return "Hudební"
      case "tanecni":
        return "Taneční"
      case "vytvarny":
        return "Výtvarný"
      default:
        return `${department}`
    }
  }

  const handleCreateEmployee = async () => {
    // Basic validation
    if (!newEmployee.name || !newEmployee.teaches || !newEmployee.resume || !newEmployee.department) {
      toast({
        title: "Chyba",
        description: "Prosím vyplňte všechna pole.",
        variant: "destructive",
      });
      return;
    }
    console.log(currentEmployee);
  
    const token = document.cookie.split("; ").find(row => row.startsWith("token"));
    if (token) {
      const tokenValue = token.split("=")[1];
      const formData = new FormData();
      formData.append("jmeno", newEmployee.name);
      formData.append("vyucuje", newEmployee.teaches);
      formData.append("zivotopis", newEmployee.resume);
      formData.append("obor", newEmployee.department);
      const imageFile = (document.getElementById("photo") as HTMLInputElement).files?.[0];
      if (imageFile) {
        formData.append("image0", imageFile);
      }
  
      try {
        const response = await fetch("https://preview.zushm.cz/api/zamestanci/new", {
          method: "POST",
          headers: {
            "Authorization": tokenValue,
          },
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Employee created successfully", data);
        } else {
          console.error("Failed to create employee:", response.statusText);
        }
  
        // Close the dialog and reset the form
        setIsCreateDialogOpen(false);
        setNewEmployee({ name: "", teaches: "", resume: "", department: "hudebni", photo: "" });
        setSelectedPhoto(null);
        setPhotoPreviewUrl("");
  
        // Fetch updated employee list after the creation is successful
        fetchZamestnanci();
  
      } catch (error) {
        console.error("Error creating employee:", error);
      }
    }
  };  

  const handleEditEmployee = async () => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token"));
    console.log(currentEmployee);
  
    if (token) {
      const tokenValue = token.split("=")[1];
      try {
        const response = await fetch("https://preview.zushm.cz/api/zamestanci/update", {
          method: "POST",
          headers: {
            "Authorization": tokenValue,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentEmployee?.id,
            jmeno: currentEmployee?.name,
            vyucuje: currentEmployee?.teaches,
            zivotopis: currentEmployee?.resume,
            obor: currentEmployee?.department,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Employee updated successfully", data);
        } else {
          console.error("Failed to update employee:", response.statusText);
        }
  
        // Close the edit dialog after the update
        setIsEditDialogOpen(false);
  
        // Fetch updated employee list after editing
        fetchZamestnanci();
  
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    }
  };

  const handleDeleteEmployee = async () => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="));
    console.log(currentEmployee?.name);
  
    if (token) {
      const tokenValue = token.split("=")[1];
  
      try {
        const response = await fetch("https://preview.zushm.cz/api/zamestanci/delete", {
          method: "POST",
          headers: {
            "Authorization": tokenValue,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jmeno: currentEmployee?.name
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Employee deleted successfully", data);
        } else {
          console.error("Failed to delete employee:", response.statusText);
        }
  
        // Close the delete dialog after deletion
        setIsDeleteDialogOpen(false);
  
        // Fetch updated employee list after deletion
        fetchZamestnanci();
  
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    } else {
      toast({
        title: "Neúspěch",
        description: "Nejste přihlášeni.",
        variant: "destructive",
      });
    }
  };  

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedPhoto(file)
      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openEditDialog = (employee: Employee) => {
    setCurrentEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (employee: Employee) => {
    setCurrentEmployee(employee)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen">
    <Sidebar></Sidebar>
    <div className="flex-1 p-6">
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Zaměstnanci</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Přidat zaměstnance
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seznam zaměstnanců</CardTitle>
          <CardDescription>Správa zaměstnanců a jejich informací</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Foto</TableHead>
                <TableHead>Jméno</TableHead>
                <TableHead>Vyučuje</TableHead>
                <TableHead>Obor</TableHead>
                <TableHead className="text-right">Akce</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={employee.photo || "/placeholder.svg"}
                        alt={employee.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.teaches}</TableCell>
                  <TableCell>{getDepartmentLabel(employee.department)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(employee)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Upravit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(employee)}
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
            <DialogTitle>Přidat zaměstnance</DialogTitle>
            <DialogDescription>Vytvořte nového zaměstnance zadáním potřebných informací.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Jméno
              </Label>
              <Input
                id="name"
                value={newEmployee.name || ""}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teaches" className="text-right">
                Vyučuje
              </Label>
              <Input
                id="teaches"
                value={newEmployee.teaches || ""}
                onChange={(e) => setNewEmployee({ ...newEmployee, teaches: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Obor
              </Label>
              <Select onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value as Department })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Vyberte obor" defaultValue={newEmployee.department} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hudebni">Hudební</SelectItem>
                  <SelectItem value="tanecni">Taneční</SelectItem>
                  <SelectItem value="vytvarny">Výtvarný</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Životopis
              </Label>
              <Textarea
                id="resume"
                value={newEmployee.resume || ""}
                onChange={(e) => setNewEmployee({ ...newEmployee, resume: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="photo" className="text-right">
                Fotka
              </Label>
              <div className="col-span-3">
                <Input type="file" id="photo" onChange={handlePhotoChange} />
                {photoPreviewUrl && (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full mt-2">
                    <img
                      src={photoPreviewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>
              Zrušit
            </Button>
            <Button type="submit" onClick={handleCreateEmployee}>
              Vytvořit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upravit zaměstnance</DialogTitle>
            <DialogDescription>Upravte informace o vybraném zaměstnanci.</DialogDescription>
          </DialogHeader>
          {currentEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Jméno
                </Label>
                <Input
                  id="name"
                  value={currentEmployee.name || ""}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teaches" className="text-right">
                  Vyučuje
                </Label>
                <Input
                  id="teaches"
                  value={currentEmployee.teaches || ""}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, teaches: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Obor
                </Label>
                <Select
                  onValueChange={(value) => setCurrentEmployee({ ...currentEmployee, department: value as Department })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Vyberte obor" defaultValue={currentEmployee.department} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hudebni">Hudební</SelectItem>
                    <SelectItem value="tanecni">Taneční</SelectItem>
                    <SelectItem value="vytvarny">Výtvarný</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resume" className="text-right">
                  Životopis
                </Label>
                <Textarea
                  id="resume"
                  value={currentEmployee.resume || ""}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, resume: e.target.value })}
                  className="col-span-3"
                />

              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
              Zrušit
            </Button>
            <Button type="submit" onClick={handleEditEmployee}>
              Uložit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Smazat zaměstnance</DialogTitle>
            <DialogDescription>Opravdu chcete smazat tohoto zaměstnance? Tato akce je nevratná.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Zrušit
            </Button>
            <Button type="submit" variant="destructive" onClick={handleDeleteEmployee}>
              Smazat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </div>
    </div>
  )
}

export default ZamestnanciPage