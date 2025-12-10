<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Validation;
use Illuminate\Support\Facades\Validator;

class ValidationController extends Controller
{
    /**
     * Store a new validation request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function requestValidation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'job' => 'nullable|string',
            'job_description' => 'nullable|string',
            'income' => 'nullable|numeric', // Perbaikan: ganti 'string' ke 'numeric'
            'reason_accepted' => 'required|string', // Perbaikan: jadikan 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $society = auth('sanctum')->user();
        if ($society->validation()->exists()) {
            return response()->json(['message' => 'You have already sent a validation request'], 401);
        }

        $validation = new Validation([
            'job' => $request->job,
            'job_description' => $request->job_description,
            'income' => $request->income,
            'reason_accepted' => $request->reason_accepted,
            'society_id' => $society->id
        ]);
        $society->validation()->save($validation);

        return response()->json(['message' => 'Request data validation sent successful'], 200);
    }

    /**
     * Get the validation status for the authenticated society.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getValidation()
    {
        $society = auth('sanctum')->user();
        $validation = $society->validation()->with('validator')->first();

        if (!$validation) {
            return response()->json(['validation' => null], 200);
        }

        return response()->json([
            'validation' => [
                'id' => $validation->id,
                'status' => $validation->status,
                'job' => $validation->job,
                'job_description' => $validation->job_description,
                'income' => $validation->income,
                'reason_accepted' => $validation->reason_accepted,
                'validator_notes' => $validation->notes,
                'validator' => $validation->validator
            ]
        ], 200);
    }
}