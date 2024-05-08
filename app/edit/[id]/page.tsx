"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ToastAction } from "@/components/ui/toast";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER;

interface Attribute {
  _id?: string;
  attributeName: string;
  attributeType: string;
  attributeValue: string | number ;
}

interface Entity {
  _id: string;
  entityType: string;
  dynamicAttributes: Attribute[];
}

const EditEntity = () => {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [entityType, setEntityType] = useState<string>("");
  const [attributeName, setAttributeName] = useState<string>("");
  const [attributeType, setAttributeType] = useState<string>("String");
  const [attributeValue, setAttributeValue] = useState<string | number >("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/entity/${pathname.split("/")[2]}`
        );
        console.log(response.data);
        setEntityType(response.data.entityType);
        setAttributes(response.data.dynamicAttributes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("done fetching data");
        setLoading(false);
      }
    };

    fetchEntity();
  }, [pathname]);

  const handleAttributeDelete = (id: string) => async () => {
    try {
        setLoading(true);
      await axios.delete(
        `/api/v1/entity/${
          pathname.split("/")[2]
        }/attribute/${id}`
      );
      toast({ description: "Attribute Deleted Successfully" });
      setAttributes((prevAttributes) =>
        prevAttributes.filter((attribute) => attribute._id !== id)
      );
    } catch (error) {
      console.error("Error deleting attribute:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

    } finally {
        setLoading(false);
    }
  };

  const handleAttributeCreation = async () => {
    try {
        setLoading(true);
      const newAttribute = {
        attributeName,
        attributeType,
        attributeValue,
      };
      console.log;

      const response = await axios.put(
        `/api/v1/entity/${
          pathname.split("/")[2]
        }/attribute`,
        newAttribute
      );
      console.log(response);

      const response2 = await axios.get(
        `/api/v1/entity/${pathname.split("/")[2]}`
      );
      console.log(response2.data);
      setEntityType(response2.data.entityType);
      setAttributes(response2.data.dynamicAttributes);

      console.log(response2);
      toast({ description: "Attribute Updated Successfully" });

      setAttributeName("");
      setAttributeType("");
      setAttributeValue("");
    } catch (error) {
      console.error("Error creating attribute:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally{
        setLoading(false);
    }
  };

  const handleAttributeEdit = (id: string) => async () => {
    try {
        setLoading(true);
      const updatedAttribute = {
        attributeName,
        attributeType,
        attributeValue,
      };

      const response = await axios.put(
        `/api/v1/entity/${
          pathname.split("/")[2]
        }/attribute/${id}`,
        updatedAttribute
      );
      const response2 = await axios.get(
        `/api/v1/entity/${pathname.split("/")[2]}`
      );
      console.log(response2.data);
      setEntityType(response2.data.entityType);
      setAttributes(response2.data.dynamicAttributes);

      console.log(response2);
      toast({ description: "Attribute Updated Successfully" });

      setAttributeName("");
      setAttributeType("");
      setAttributeValue("");
    } catch (error) {
      console.error("Error updating attribute:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally{
        setLoading(false);
    }
  }

  const handleAttributeValueFill = (attribute: Attribute) => () => {
    setAttributeName(attribute.attributeName);
    setAttributeType(attribute.attributeType);
    setAttributeValue(attribute.attributeValue);
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
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
        />
        
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Attribute Name</TableHead>
            <TableHead>Attributes Type</TableHead>
            <TableHead>Attributes Value</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>

        {attributes.map((attribute, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>

            <TableCell>{attribute.attributeName}</TableCell>
            <TableCell>{attribute.attributeType}</TableCell>
            <TableCell>{attribute.attributeValue}</TableCell>
            <TableCell>  
                <Dialog >
                  <DialogTrigger className="hover:cursor-pointer">
                  <Button
                  className="hover:cursor-pointer mx-2"
                  variant={"outline"}
                  onClick={handleAttributeValueFill(attribute)}
                >
                  Edit
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
                  value={attributeName}
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
                  value={attributeValue}
                  className="col-span-3"
                  onChange={(e) => setAttributeValue(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleAttributeEdit(attribute._id as string)}
>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
                </Dialog>
                <Button
                  className="hover:cursor-pointer"
                  onClick={handleAttributeDelete(attribute._id as string)}
                  variant={"destructive"}
                >
                  <Cross2Icon/>
                </Button>
                </TableCell>
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
                <Button type="submit" onClick={handleAttributeCreation}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      

    </main>
  );
};

export default EditEntity;
