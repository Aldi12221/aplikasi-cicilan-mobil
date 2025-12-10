<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Society;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
// Benar: Menggunakan facade Schema dari namespace Illuminate\Support\Facades
use Illuminate\Support\Facades\Schema;

class SocietySeeder extends Seeder
{
    public function run()
    
    {
        
        Schema::disableForeignKeyConstraints();
        // Hapus data lama agar tidak ada duplikasi
        Society::truncate();


        $societiesData = [
            ['id_card_number' => '20210001', 'password' => '1212112', 'name' => 'Omar Gunawan', 'born_date' => '1990-04-18', 'gender' => 'male', 'address' => 'Jln. Baranang Siang No. 479, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210002', 'password' => '1212112', 'name' => 'Nilam Sinaga', 'born_date' => '1998-09-11', 'gender' => 'female', 'address' => 'Gg. Sukajadi No. 26, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210003', 'password' => '1212112', 'name' => 'Rosman Lailasari', 'born_date' => '1983-02-12', 'gender' => 'male', 'address' => 'Jln. Moch. Ramdan No. 242, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210004', 'password' => '1212112', 'name' => 'Ifa Adriansyah', 'born_date' => '1993-05-17', 'gender' => 'female', 'address' => 'Gg. Setia Budi No. 215, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210005', 'password' => '1212112', 'name' => 'Sakura Susanti', 'born_date' => '1973-11-05', 'gender' => 'male', 'address' => 'Kpg. B.Agam 1 No. 729, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210006', 'password' => '1212112', 'name' => 'Jail Utama', 'born_date' => '2001-12-28', 'gender' => 'male', 'address' => 'Kpg. Cikutra Timur No. 57, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210007', 'password' => '1212112', 'name' => 'Gawati Wibowo', 'born_date' => '1971-08-23', 'gender' => 'male', 'address' => 'Kpg. Bara No. 346, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210008', 'password' => '1212112', 'name' => 'Pia Rajata', 'born_date' => '1976-08-04', 'gender' => 'male', 'address' => 'Kpg. Yohanes No. 445, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210009', 'password' => '1212112', 'name' => 'Darmaji Suartini', 'born_date' => '1999-10-05', 'gender' => 'male', 'address' => 'Gg. Kusmanto No. 622, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210010', 'password' => '1212112', 'name' => 'Kiandra Tamba', 'born_date' => '1988-05-31', 'gender' => 'male', 'address' => 'Ki. Sutarto No. 66, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210011', 'password' => '1212112', 'name' => 'Manah Thamrin', 'born_date' => '1989-06-20', 'gender' => 'female', 'address' => 'Jln. Baung No. 871, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210012', 'password' => '1212112', 'name' => 'Banara Ardianto', 'born_date' => '1978-10-27', 'gender' => 'male', 'address' => 'Ki. Yos Sudarso No. 411, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210013', 'password' => '1212112', 'name' => 'Anggabaya Mustofa', 'born_date' => '1979-05-11', 'gender' => 'female', 'address' => 'Psr. Pacuan Kuda No. 351, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210014', 'password' => '1212112', 'name' => 'Emong Purnawati', 'born_date' => '1979-07-15', 'gender' => 'male', 'address' => 'Jln. Jayawijaya No. 141, DKI Jakarta', 'regional_id' => 1],
            ['id_card_number' => '20210015', 'password' => '1212112', 'name' => 'Nardi Pertiwi', 'born_date' => '1981-05-14', 'gender' => 'male', 'address' => 'Psr. Barasak No. 554, DKI Jakarta', 'regional_id' => 1],

            
        ];

        foreach ($societiesData as $society) {
            Society::create([
                'id_card_number' => $society['id_card_number'],
                'password' => Hash::make($society['password']),
                'name' => $society['name'],
                'born_date' => $society['born_date'],
                'gender' => $society['gender'],
                'address' => $society['address'],
                'regional_id' => $society['regional_id'],
            ]);
        }
        Schema::enableForeignKeyConstraints();
    }
}