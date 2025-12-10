<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instalment_applications', function (Blueprint $table) {
            $table->id();
            // Pastikan baris ini ada:
            $table->foreignId('society_id')->constrained('societies')->cascadeOnDelete(); 
            // Pastikan baris ini menggunakan ejaan yang benar:
            $table->foreignId('installment_id')->constrained('installments')->cascadeOnDelete();
            $table->integer('months');
            $table->text('notes')->nullable();
            $table->string('apply_status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instalment_applications');
    }
};