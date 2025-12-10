<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InstalmentApplication;
use Illuminate\Support\Facades\Validator;

class AdminApplicationController extends Controller
{
    /**
     * Get all installment applications (for admin).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $applications = InstalmentApplication::with(['society', 'installment.brand'])
                                            ->orderBy('created_at', 'desc')
                                            ->get();

        return response()->json(['applications' => $applications]);
    }

    /**
     * Update an installment application status to accepted.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function acceptApplication($id)
    {
        $application = InstalmentApplication::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $application->apply_status = 'accepted';
        $application->save();

        return response()->json(['message' => 'Application accepted successfully', 'application' => $application], 200);
    }

    /**
     * Update an installment application status to rejected.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function rejectApplication(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'notes' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $application = InstalmentApplication::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $application->apply_status = 'rejected';
        $application->notes = $request->notes;
        $application->save();

        return response()->json(['message' => 'Application rejected successfully', 'application' => $application], 200);
    }
}