"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER;

interface Attribute {
  attributeName: string;
  attributeType: string;
  attributeValue: string | number | boolean | Date;
}

interface Entity {
  _id: string;
  entityType: string;
  dynamicAttributes: Attribute[];
}

const EntityTable = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const { toast } = useToast()


  const deleteEntity = (id: string) => async () => {
    try {
      await axios.delete(`/api/v1/entity/${id}`);
      toast({description: "Entity Deleted Successfully"})
      setEntities((prevEntities) =>
        prevEntities.filter((entity) => entity._id !== id)
      );
    } catch (error) {
      console.error("Error deleting entity:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/entity");
        // console.log("hhhh",response);
        setEntities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("done fetching data");
      }
    };
    console.log("fetching data");

    fetchData();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your Entities.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Entity Type</TableHead>
          <TableHead>Attributes</TableHead>
          <TableHead>Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entities.map((entity, index) => (
          <TableRow key={entity._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{entity.entityType}</TableCell>
            <TableCell>
              <ul>
                {entity.dynamicAttributes.map((attribute: any) => (
                  <li key={attribute.attributeName}>
                    <strong>{attribute.attributeName}:</strong>{" "}
                    {typeof attribute.attributeValue === "string" ||
                    typeof attribute.attributeValue === "number"
                      ? attribute.attributeValue
                      : attribute.attributeValue.toString()}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <DotsVerticalIcon />{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <Link href={`/edit/${entity._id}`}><DropdownMenuItem className="hover:cursor-pointer">Edit</DropdownMenuItem></Link>
                  <DropdownMenuItem className="hover:cursor-pointer" onClick={deleteEntity(entity._id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EntityTable;
