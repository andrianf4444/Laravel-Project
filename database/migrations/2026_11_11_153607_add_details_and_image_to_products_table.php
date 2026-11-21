<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('sku')->nullable()->after('name');
            $table->string('image')->nullable()->after('description');
            $table->decimal('weight', 8, 2)->default(0)->after('stock');
            $table->decimal('height', 8, 2)->default(0)->after('weight');
            $table->decimal('width', 8, 2)->default(0)->after('height');
            $table->decimal('length', 8, 2)->default(0)->after('width');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['sku', 'image', 'weight', 'height', 'width', 'length']);
        });
    }
};