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
    Schema::create('validations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('society_id')->constrained('societies')->onDelete('cascade');
        $table->string('status')->default('pending');
        $table->string('job')->nullable();
        $table->string('job_description')->nullable();
        $table->string('income')->nullable();
        $table->foreignId('validator_id')->nullable()->constrained('validators');
        $table->text('notes')->nullable();
        $table->timestamps();
    });
}
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validations');
    }
};
