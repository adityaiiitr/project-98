"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation'

interface Attribute {
  attributeName: string;
  attributeType: string;
  attributeValue: string | number | boolean;
}

interface Entity {
  _id: string;
  entityType: string;
  dynamicAttributes: Attribute[];
}

const createEntity = () => {
    const { toast } = useToast();
    const router = useRouter()
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [entityType, setEntityType] = useState<string>("");
  const [attributeName, setAttributeName] = useState<string>("");
  const [attributeType, setAttributeType] = useState<string>("String");
  const [attributeValue, setAttributeValue] = useState<string | number | boolean>("");

  const handleSubmit = () => {
    setAttributes([
      ...attributes,
      { attributeName, attributeType, attributeValue },
    ]);
    setAttributeName("");
    setAttributeType("");
    setAttributeValue("");
    console.log(attributes);
  };

  const handleEntity = async () => {
    console.log(entityType);
    console.log(attributes);
    const data = {
        "entityType": entityType,
        "dynamicAttributes": attributes
    }    

    try{
        const response = await axios.post("/api/v1/entity", data);
    console.log(response);
    toast({description: "Entity Created Successfully"})
    router.push('/')
    } catch (error) {
        console.error("Error creating entity:", error);
    } finally {

    }
}

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <div className="grid grid-cols-4 items-center gap-4 my-4">
      <Label htmlFor="name" className="text-right">
                Entity Name
              </Label>
              <Input
                id="name"
                placeholder="Entity Name"
                className="col-span-3"
                onChange={(e) => setEntityType(e.target.value)}
              />
      

      
      </div>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Attribute Name</TableHead>
            <TableHead>Attributes Type</TableHead>
            <TableHead>Attributes Value</TableHead>
          </TableRow>
        </TableHeader>

        {attributes.map((attribute, index) => (
          <TableRow key={index}>
            <TableCell>{index+1}</TableCell>

            <TableCell>{attribute.attributeName}</TableCell>
            <TableCell>{attribute.attributeType}</TableCell>
            <TableCell>{attribute.attributeValue}</TableCell>
          </TableRow>
        ))}
      </Table>
      <div className="flex justify-center items-center my-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            Add Attribute <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Attribute</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Attribute Name"
                className="col-span-3"
                onChange={(e) => setAttributeName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 w-full">
              <Label htmlFor="username" className="text-right">
                Type
              </Label>
              <Select
                onValueChange={(value) => setAttributeType(value)}
                defaultValue={attributeType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Attribute Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {["String", "Number", "Date"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Value
              </Label>
              <Input
                id="name"
                placeholder="Attribute Value"
                className="col-span-3"
                onChange={(e) => setAttributeValue(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button onClick={handleEntity} className="mx-4">Create Entity</Button>
      </div>
    </main>
  );
};

export default createEntity;
