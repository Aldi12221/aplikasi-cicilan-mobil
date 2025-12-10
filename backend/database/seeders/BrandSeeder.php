<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Brand; // Pastikan model Brand sudah dibuat
use Carbon\Carbon;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Brand::firstOrCreate(['name' => 'Toyota'], ['created_at' => Carbon::now(), 'updated_at' => Carbon::now()]);
        Brand::firstOrCreate(['name' => 'Nissan'], ['created_at' => Carbon::now(), 'updated_at' => Carbon::now()]);
        
        // Anda bisa menambahkan merek lain di sini jika diperlukan
        // Brand::firstOrCreate(['name' => 'Honda'], ['created_at' => Carbon::now(), 'updated_at' => Carbon::now()]);
    }
}