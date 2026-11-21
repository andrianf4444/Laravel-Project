import { Head } from "@inertiajs/react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateUsers() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/users");
    };
    return (
        <>
            <Head title="Tambah User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="mb-6 text-xl font-semibold">Tambah User</h1>
                    <form onSubmit={submit} className="max-w-2xl space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Masukkan nama"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Masukkan email"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Masukkan password"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                defaultValue={data.role}
                                onValueChange={(value) =>
                                    setData("role", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager"> Manager</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="supervisor">Supervisor</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.role}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? "Menyimpan..." : "Simpan"}
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href="/users">Kembali</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

CreateUsers.layout = {
    breadcrumbs: [
        {
            title: "Users Management",
            href: "/users",
        },
        {
            title: "Tambah User",
            href: "/users/create",
        },
    ],
};
