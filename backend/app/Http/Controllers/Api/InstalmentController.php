<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Installment; // Sesuai dengan model Anda
use App\Models\InstalmentApplication; // Sesuai dengan model yang kita buat
use App\Models\AvailableMonth;
use Illuminate\Support\Facades\Validator;

class InstalmentController extends Controller
{
    /**
     * Get all available installment cars.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllInstalmentCars()
    {
        $cars = Installment::with('brand', 'availableMonths')->get()->map(function ($car) {
            return [
                'id' => $car->id,
                'car' => $car->car,
                'brand' => optional($car->brand)->name,
                'price' => (string)$car->price,
                'description' => $car->description,
                'available_month' => $car->availableMonths->map(function ($month) {
                    return [
                        'id' => $month->id,
                        'month' => $month->month,
                        'description' => $month->description,
                    ];
                })
            ];
        });

        return response()->json(['instalment_cars' => $cars], 200);
    }

    /**
     * Get details for a specific installment car.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInstalmentDetail($id)
    {
        $instalment = Installment::with('brand', 'availableMonths')->find($id);

        if (!$instalment) {
            return response()->json(['message' => 'Instalment not found'], 404);
        }

        return response()->json([
            'instalment' => [
                'id' => $instalment->id,
                'car' => $instalment->car,
                'brand' => optional($instalment->brand)->name,
                'price' => (string)$instalment->price,
                'description' => $instalment->description,
                'available_month' => $instalment->availableMonths->map(function ($month) {
                    return [
                        'id' => $month->id,
                        'month' => $month->month,
                        'description' => $month->description,
                        'nominal' => (string)$month->nominal,
                    ];
                })
            ]
        ], 200);
    }

    /**
     * Apply for an installment car.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function applyForInstalment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'installment_id' => 'required|exists:installments,id', // Perbaikan: 'installment_id'
            'months' => 'required|integer|exists:available_months,month',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid field', 'errors' => $validator->errors()], 422);
        }

        $society = auth('sanctum')->user();
        $validation = $society->validation()->first();
        if (!$validation || $validation->status !== 'accepted') {
            return response()->json(['message' => 'Your data validator must be accepted by validator before'], 401);
        }

        if (InstalmentApplication::where('society_id', $society->id)->exists()) {
            return response()->json(['message' => 'Application for a instalment can only be once'], 401);
        }

        $application = new InstalmentApplication();
        $application->society_id = $society->id;
        $application->installment_id = $request->installment_id; // Perbaikan: 'installment_id'
        $application->months = $request->months;
        $application->notes = $request->notes;
        $application->apply_status = 'pending';
        $application->save();

        return response()->json(['message' => 'Applying for Instalment successful'], 200);
    }

    /**
     * Get all installment applications for the authenticated society.
     *
     * @return \Illuminate\Http\JsonResponse
     */
   // app/Http/Controllers/Api/InstalmentController.php

public function getMyApplications()
{
    $society = auth('sanctum')->user();
    
    // Mengambil semua aplikasi cicilan dengan relasi installment dan brand
    // Menambahkan `whereHas` untuk memastikan relasi `installment` ada
    $applications = $society->applications()
        ->whereHas('installment') // Hanya ambil aplikasi yang memiliki installment
        ->with('installment.brand')
        ->get()
        ->map(function ($application) {
            
            // Menggunakan optional() untuk menghindari error jika relasi null
            $installment = optional($application->installment);
            $brand = optional($installment->brand);

            return [
                'id' => $installment->id,
                'car' => $installment->car,
                'brand' => [
    'name' => $brand->name
],
                'price' => (string)$installment->price,
                'description' => $installment->description,
                'applications' => [
                    [
                        'month' => (string)$application->months,
                        'apply_status' => $application->apply_status,
                        'notes' => $application->notes,
                        'created_at' => $application->created_at, // Tambahkan created_at
                    ]
                ]
            ];
        });

    return response()->json(['instalments' => $applications], 200);
}
}