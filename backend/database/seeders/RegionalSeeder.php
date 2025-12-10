<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('regionals')->insert([
            ['province' => 'DKI Jakarta', 'district' => 'Central Jakarta'],
            ['province' => 'DKI Jakarta', 'district' => 'South Jakarta'],
            ['province' => 'West Java', 'district' => 'Bandung'],
            ['province' => 'West Java', 'district' => 'Bogor'],
        ]);
    }
}