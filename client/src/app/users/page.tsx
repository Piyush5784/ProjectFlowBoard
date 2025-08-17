"use client";
import Header from "@/components/custom/Header";
import { useGetUsersQuery } from "@/store/state/api";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [page, setPage] = useState(1);
  const { theme, setTheme } = useTheme();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users.</div>;

  const paginatedUsers =
    users?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || [];
  const totalPages = users ? Math.ceil(users.length / PAGE_SIZE) : 1;

  return (
    <div
      className={`flex w-full flex-col p-8 min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <Header name="Users" />
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Profile Picture</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user: any) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-start">
                    <div className="h-9 w-9">
                      <img
                        src={user?.profilePictureUrl ?? ""}
                        alt={user.username}
                        width={36}
                        height={36}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Users;
