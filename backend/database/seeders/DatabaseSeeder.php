<?php

namespace Database\Seeders;

use App\Models\Brand;
use Dotenv\Validator;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Jalankan seeder aplikasi.
     */
    public function run(): void
    {
        $this->call([
            RegionalSeeder::class,
            RoleSeeder::class,
            ValidatorSeeder::class,
            BrandSeeder::class,
            InstalmentCarSeeder::class,

            SocietySeeder::class,



        ]);
    }
}
