"use client";
import Header from "@/components/custom/Header";
import { Teams as TeamType, useGetTeamsQuery } from "@/store/state/api";
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

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const [page, setPage] = useState(1);
  const { theme, setTheme } = useTheme();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching teams.</div>;

  const paginatedteams =
    teams?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || [];
  const totalPages = teams ? Math.ceil(teams.length / PAGE_SIZE) : 1;

  return (
    <div
      className={`flex w-full flex-col p-8 min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <Header name="teams" />
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Product Owner</TableHead>
              <TableHead>Project Manager</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedteams.map((team: TeamType) => (
              <TableRow key={team.id}>
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.teamName}</TableCell>
                <TableCell>{team.productOnwerUsername ?? "—"}</TableCell>
                <TableCell>{team.projectManagerUsername ?? "—"}</TableCell>
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

export default Teams;
