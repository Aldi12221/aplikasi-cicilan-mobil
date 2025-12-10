<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Society;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle user login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
         \Illuminate\Support\Facades\Log::info('Login attempt for society: ' . $request->id_card_number);
        // Validasi input dari pengguna (id_card_number dan password)
        $request->validate([
            'id_card_number' => 'required|string|size:8',
            'password' => 'required|string',
        ]);

        // Cari pengguna berdasarkan id_card_number dan relasi regional
        $society = Society::with('regional')->where('id_card_number', $request->id_card_number)->first();

        // Cek apakah pengguna ditemukan dan password cocok
        if (!$society || !Hash::check($request->password, $society->password)) {
            return response()->json(['message' => 'ID Card Number or Password incorrect'], 401);
        }
        
        // Buat token autentikasi menggunakan Sanctum
        $token = $society->createToken('auth-token', ['society'])->plainTextToken;

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->gender,
            'address' => $society->address,
            'token' => $token,
            'regional' => $society->regional,
            'role' => 'society'
        ], 200);
    }

    /**
     * Handle user logout.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Hapus token yang sedang digunakan
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout success'], 200);
    }
}