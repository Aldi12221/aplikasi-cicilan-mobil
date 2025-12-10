<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Validation;
use App\Models\Validator;

class ValidatorController extends Controller
{
    /**
     * Get all pending validation requests.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPendingValidations()
    {
        $validations = Validation::with('society.regional')
                                 ->where('status', 'pending')
                                 ->get();

        return response()->json(['validations' => $validations]);
    }

    /**
     * Accept a validation request.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function acceptValidation($id)
    {
        $validation = Validation::find($id);

        if (!$validation) {
            return response()->json(['message' => 'Validation request not found'], 404);
        }

        if ($validation->status !== 'pending') {
            return response()->json(['message' => 'Validation request has already been processed'], 400);
        }
        
        // Perbaikan: Ubah guard dari 'sanctum' ke 'validator'
        $validator = auth('validator')->user(); 
        
        $validation->status = 'accepted';
        $validation->validator_id = $validator->id;
        $validation->save();

        return response()->json(['message' => 'Validation request accepted successfully'], 200);
    }

    /**
     * Reject a validation request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function rejectValidation(Request $request, $id)
    {
        $request->validate(['notes' => 'required|string']);

        $validation = Validation::find($id);

        if (!$validation) {
            return response()->json(['message' => 'Validation request not found'], 404);
        }

        if ($validation->status !== 'pending') {
            return response()->json(['message' => 'Validation request has already been processed'], 400);
        }

        // Perbaikan: Ubah guard dari 'sanctum' ke 'validator'
        $validator = auth('validator')->user();

        $validation->status = 'rejected';
        $validation->validator_id = $validator->id;
        $validation->notes = $request->notes;
        $validation->save();

        return response()->json(['message' => 'Validation request rejected successfully'], 200);
    }
}