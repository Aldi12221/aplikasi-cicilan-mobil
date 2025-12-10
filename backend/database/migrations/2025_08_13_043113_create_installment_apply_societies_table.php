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
    Schema::create('installment_apply_societies', function (Blueprint $table) {
        $table->id();
        $table->foreignId('society_id')->constrained('societies')->onDelete('cascade');
        $table->foreignId('installment_id')->constrained('installments')->onDelete('cascade');
        $table->integer('months');
        $table->text('notes')->nullable();
        $table->foreignId('installment_apply_status_id')->default(1)->constrained('installment_apply_statuses');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('installment_apply_societies');
    }
};
