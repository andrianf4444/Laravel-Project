import { Head, useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ImagePlus, Package } from "lucide-react";

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
    product: Product;
}

export default function ProductsEdit({ product }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT", // Trik agar Laravel membaca FormData multipart sebagai request PUT
        name: product.name ?? "",
        sku: product.sku ?? "",
        description: product.description ?? "",
        price: product.price ? product.price.toString() : "",
        stock: product.stock ? product.stock.toString() : "",
        weight: product.weight ? product.weight.toString() : "",
        height: product.height ? product.height.toString() : "",
        width: product.width ? product.width.toString() : "",
        length: product.length ? product.length.toString() : "",
        image: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(
        product.image ? `/storage/${product.image}` : null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Menggunakan method post() dengan _method: 'PUT' karena file upload di browser/HTML form
        post(`/products/${product.id}`);
    };

    return (
        <>
            <Head title="Edit Produk" />
            <div className="container mx-auto p-6 max-w-4xl space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">Edit Produk</h1>
                        <p className="text-sm text-muted-foreground">Perbarui informasi, atribut, dan gambar produk.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Kolom Kiri: Form Detail & Dimensi */}
                    <div className="md:col-span-2 space-y-5">
                        <div className="bg-card p-5 rounded-xl border space-y-4">
                            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Informasi Dasar</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1.5">Nama Produk *</label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="Nama produk"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1.5">SKU</label>
                                    <Input
                                        value={data.sku}
                                        onChange={(e) => setData("sku", e.target.value)}
                                        placeholder="SKU Produk"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1.5">Deskripsi</label>
                                <textarea
                                    className="w-full min-h-[90px] px-3 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Tuliskan deskripsi produk..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1.5">Harga (Rp) *</label>
                                    <Input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData("price", e.target.value)}
                                        placeholder="0"
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1.5">Stok *</label>
                                    <Input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData("stock", e.target.value)}
                                        placeholder="0"
                                    />
                                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Dimensi & Berat */}
                        <div className="bg-card p-5 rounded-xl border space-y-4">
                            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Dimensi & Berat</h2>
                            <div className="grid grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs font-medium mb-1">Berat (g)</label>
                                    <Input type="number" value={data.weight} onChange={(e) => setData("weight", e.target.value)} placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Tinggi (cm)</label>
                                    <Input type="number" value={data.height} onChange={(e) => setData("height", e.target.value)} placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Lebar (cm)</label>
                                    <Input type="number" value={data.width} onChange={(e) => setData("width", e.target.value)} placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Panjang (cm)</label>
                                    <Input type="number" value={data.length} onChange={(e) => setData("length", e.target.value)} placeholder="0" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Update Foto */}
                    <div className="space-y-4">
                        <div className="bg-card p-5 rounded-xl border space-y-3 flex flex-col items-center text-center">
                            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider self-start">Foto Produk</h2>
                            
                            <div className="relative w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center overflow-hidden bg-muted/10 hover:bg-muted/20 transition cursor-pointer group">
                                {preview ? (
                                    <img src={preview} alt="Preview Produk" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center p-4">
                                        <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                                        <span className="text-xs font-medium text-muted-foreground">Ganti / Upload Foto</span>
                                        <span className="text-[10px] text-muted-foreground/60 mt-1">PNG, JPG, WEBP hingga 2MB</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <Button type="submit" className="w-full" disabled={processing}>
                                Perbarui Produk
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/products">Batal</Link>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

ProductsEdit.layout = {
    breadcrumbs: [
        { title: "Products Management", href: "/products" },
        { title: "Edit Produk", href: "#" },
    ],
};