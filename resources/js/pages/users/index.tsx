import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    totalUsers?: number;
    filter: {
        search?: string;
    };
    c_url?: string;
}

export default function UsersIndex({ users, filter }: Props) {
    const [search, setSearch] = useState(filter.search ?? "");
    const { flash } = usePage().props as any;

    const handleDelete = (userId: number) => {
        router.delete(`/users/${userId}`);
    };

    const getRoleBadgeVariant = (role: string) => {
        switch (role.toLowerCase()) {
            case "admin":
                return "destructive";
            case "manager":
                return "default";
            case "supervisor":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <>
            <Head title="Users Management" />
            <div className="container mx-auto p-6 space-y-4">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {flash.error}
                    </div>
                )}

                {/* Header Actions */}
                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari User..."
                            value={search}
                            className="pl-8"
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearch(value);
                                router.get(
                                    "/users",
                                    { search: value },
                                    {
                                        preserveState: true,
                                        replace: true,
                                    }
                                );
                            }}
                        />
                    </div>

                    <Button asChild>
                        <Link href="/users/create">Tambah User</Link>
                    </Button>
                </div>

                {/* Tabel Data Users */}
                <div className="rounded-xl border border-sidebar-border/70 overflow-hidden dark:border-sidebar-border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data && users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/users/${user.id}/edit`}>
                                                    Edit
                                                </Link>
                                            </Button>

                                            {user.role !== "admin" && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">
                                                            Hapus
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Konfirmasi Hapus
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Batal
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(user.id)}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                        Data user tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination: Terletak persis di bawah tabel dengan gap yang kompak */}
                <div className="flex items-center justify-start gap-4 pt-2">
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                        Halaman{" "}
                        <span className="font-medium text-foreground">
                            {users.current_page}
                        </span>{" "}
                        dari{" "}
                        <span className="font-medium text-foreground">
                            {users.last_page}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="outline"
                            className="h-8 px-3 text-xs"
                            disabled={!users.prev_page_url}
                            onClick={() =>
                                users.prev_page_url &&
                                router.visit(users.prev_page_url)
                            }
                        >
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            className="h-8 px-3 text-xs"
                            disabled={!users.next_page_url}
                            onClick={() =>
                                users.next_page_url &&
                                router.visit(users.next_page_url)
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        {
            title: "Users Management",
            href: "/users",
        },
    ],
};