<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('available_months', function (Blueprint $table) {
        $table->id();
        $table->foreignId('installment_id')->constrained('installments')->onDelete('cascade');
        $table->integer('month');
        $table->string('description');
        $table->decimal('nominal', 15, 2);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('available_months');
    }
};
