import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const createEntity = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>entity page</p>
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
              />
            </div>
            <div className="grid grid-col-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Type
              </Label>
              <Select >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Subject" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {[
                      "String",
                      "Number",
                      "Date",
                    ].map((item) => (
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
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default createEntity;
