<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ValidatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('validators')->insert([
            'name' => 'Validator',
            'email' => 'validator@example.com',
            'password' => Hash::make('admin123'), 
            'role_id'=> 1 ,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('validators')->insert([
            'name' => 'company',
            'email' => 'company@example.com',
            'password' => Hash::make('admin123'), 
            'role_id'=> 2 ,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}