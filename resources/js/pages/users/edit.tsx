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

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export default function EditUsers({ user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };
    return (
        <>
            <Head title="Edit User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="mb-6 text-xl font-semibold">Edit User</h1>
                    <form onSubmit={submit} className="max-w-2xl space-y-5">
                        <div>
                            <Label>Nama</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && <p>{errors.name}</p>}
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && <p>{errors.email}</p>}
                        </div>

                        <Select
                            value={data.role}
                            onValueChange={(value) => setData("role", value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? "Menyimpan..." : "Simpan"}
                            </Button>
                            <Link href="/users">
                                <Button type="button" variant="outline">
                                    Kembali
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

EditUsers.layout = {
    breadcrumbs: [
        {
            title: "Users Management",
            href: "/users",
        },
        {
            title: "Edit User",
            href: `/users/edit`,
        },
    ],
};
