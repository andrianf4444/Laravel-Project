import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package } from "lucide-react";
import DeleteProductButton from "@/components/delete-product-button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Product = {
    id: number;
    name: string;
    sku: string | null;
    description: string | null;
    image: string | null;
    price: number;
    stock: number;
    weight: number;
    height: number;
    width: number;
    length: number;
};

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    totalProducts: number;
    filter?: {
        search?: string;
    };
}

export default function ProductsIndex({ products, totalProducts, filter }: Props) {
    const [search, setSearch] = useState(filter?.search ?? "");
    const { flash } = usePage().props as any;
    return (
        <>
            <Head title="Products Management" />
            <div className="container mx-auto p-6 space-y-4">
                {flash?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {flash.success}
                    </div>
                )}
                <div className="flex items-center justify-between gap-4 w-full mb-4">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari Produk / SKU..."
                            value={search}
                            className="pl-8"
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearch(value);
                                router.get(
                                    "/products",
                                    { search: value },
                                    { preserveState: true, replace: true }
                                );
                            }}
                        />
                    </div>

                    <Button asChild>
                        <Link href="/products/create">Tambah Produk</Link>
                    </Button>
                </div>

                {/* Tabel Data Products */}
                <div className="rounded-xl border border-sidebar-border/70 overflow-hidden dark:border-sidebar-border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Foto</TableHead>
                                <TableHead>Produk</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>Dimensi (Pxlxt)</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.data && products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        {/* Thumbnail Gambar */}
                                        <TableCell>
                                            <div className="h-10 w-10 rounded-md border overflow-hidden bg-muted/20 flex items-center justify-center">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/${product.image}`}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <Package className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div>{product.name}</div>
                                            {product.description && (
                                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {product.description}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground">
                                            {product.sku ?? "-"}
                                        </TableCell>
                                        <TableCell>
                                            Rp {Number(product.price).toLocaleString("id-ID")}
                                        </TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            {product.length}x{product.width}x{product.height} cm
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/products/${product.id}/edit`}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <DeleteProductButton productId={product.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                        Data produk tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

ProductsIndex.layout = {
    breadcrumbs: [
        { title: "Products Management", href: "/products" },
    ],
};