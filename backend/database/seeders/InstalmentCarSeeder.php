<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Brand;
use App\Models\Installment; // Tambahkan baris ini
use Carbon\Carbon;

class InstalmentCarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $toyotaId = Brand::where('name', 'Toyota')->first()->id;
        $nissanId = Brand::where('name', 'Nissan')->first()->id;

        // Data Mobil 1
        $car1 = Installment::create([
            'car' => 'Toyota FT 86',
            'brand_id' => $toyotaId,
            'description' => 'Toyota FT 86 car is the best',
            'price' => 900000000,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        
        // Data Tenor untuk Mobil 1
        DB::table('available_months')->insert([
    [
        'installment_id' => $car1->id,
        'month' => 12,
        'description' => 'Tenor 12 bulan',
        'nominal' => 75000000, // tambahkan nominal
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
    ],
    [
        'installment_id' => $car1->id,
        'month' => 24,
        'description' => 'Tenor 24 bulan',
        'nominal' => 40000000, // tambahkan nominal
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
    ],
    [
        'installment_id' => $car1->id,
        'month' => 48,
        'description' => 'Tenor 48 bulan',
        'nominal' => 20000000, // tambahkan nominal
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
    ],
]);
        
        // Data Mobil 2
        $car2 = Installment::create([
            'car' => 'Nissan Livina',
            'brand_id' => $nissanId,
            'description' => 'Family Cars for everyone',
            'price' => 275000000,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        
        // Data Tenor untuk Mobil 2
        DB::table('available_months')->insert([
    [
        'installment_id' => $car2->id,
        'month' => 12,
        'description' => 'Tenor 12 bulan',
        'nominal' => 25000000, // tambahkan nominal
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
    ],
    [
        'installment_id' => $car2->id,
        'month' => 24,
        'description' => 'Tenor 24 bulan',
        'nominal' => 13000000, // tambahkan nominal
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
    ],
]);
    }
}