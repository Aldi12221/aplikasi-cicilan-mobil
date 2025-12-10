<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Validator;

class ValidatorAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $validator = Validator::where('email', $request->email)->first();

        if (!$validator || !Hash::check($request->password, $validator->password)) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        $token = $validator->createToken('validator-token', ['validator'])->plainTextToken;

        return response()->json([
        'token' => $token,
        'validator' => $validator,
        'role' => 'validator' // Tambahkan properti role
    ]);
    }
    
    public function logout(Request $request)
    {
        $request->user('validator')->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout success']);
    }
}