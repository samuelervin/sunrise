'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator,DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem  } from "@/components/ui/dropdown-menu";
import { Network } from "@/lib/network";
import { capitalize, capitalizeFirstLetters } from "@/lib/utils";
import { } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { stat } from "fs";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Network>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}  
                className="flex items-center"
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
      },
      cell: ({ row }: { row: { original: Network } }) => 
        { 
          return (
                <div className="flex items-center gap-2 text-xs" >
                   {row.original.name ? row.original.name : row.original.id}
                   </div>
                );
        }
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }: { row: { original: Network } }) => row.original.description
    },
    {
         accessorKey: "subnets",
         header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              > Subnets Associated <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
      },
         cell: ({ row }: { row: { original: Network } }) => {
            return (
              <>
                {row.original.subnets.map((subnet) => (
                  <div key={subnet} className="flex items-center gap-2 text-xs">
                    {subnet}
                  </div>
                ))}
              </>
            );
         },

    },
    {
      accessorKey: "shared",
      header: "Shared",
      cell: ({ row }: { row: { original: Network } }) => {
        return (
          <Badge variant={row.original.shared ? "default" : "destructive"}>
            {row.original.shared ? "Yes" : "No"}
          </Badge>
        );
      }

    },{
      accessorKey: "external",
      header: "external",
      cell: ({ row }: { row: { original: Network } }) => {
        return (
          
            row.original.router ? row.original.router.external.toString() : "N/A"
        );
      }

    },
        {
          accessorKey: "actions",
          header: "Actions",
          meta: {
            label: "Actions"
          },
          enableHiding: false,
          cell: ({ row }) => {
            return (
              <div className="relative flex justify-center items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          }
        }
  
  ]