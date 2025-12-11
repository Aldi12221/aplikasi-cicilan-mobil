<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Installment;
use App\Models\AvailableMonth;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AdminVehicleController extends Controller
{
    /**
     * Get all vehicles (installments).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $vehicles = Installment::with('brand', 'availableMonths')->get();
        return response()->json(['vehicles' => $vehicles], 200);
    }

    /**
     * Store a new vehicle.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand_id' => 'required|exists:brands,id',
            'car' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'available_months' => 'required|array',
            'available_months.*.month' => 'required|integer|min:1',
            'available_months.*.description' => 'nullable|string',
            'available_months.*.nominal' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            $vehicle = Installment::create([
                'brand_id' => $request->brand_id,
                'car' => $request->car,
                'description' => $request->description,
                'price' => $request->price,
            ]);

            foreach ($request->available_months as $month) {
                AvailableMonth::create([
                    'installment_id' => $vehicle->id,
                    'month' => $month['month'],
                    'description' => $month['description'] ?? null,
                    'nominal' => $month['nominal'],
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => 'Vehicle created successfully',
                'vehicle' => $vehicle->load('brand', 'availableMonths')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create vehicle', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get a specific vehicle.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $vehicle = Installment::with('brand', 'availableMonths')->find($id);

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        return response()->json(['vehicle' => $vehicle], 200);
    }

    /**
     * Update a vehicle.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $vehicle = Installment::find($id);

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'brand_id' => 'sometimes|required|exists:brands,id',
            'car' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'available_months' => 'sometimes|required|array',
            'available_months.*.month' => 'required|integer|min:1',
            'available_months.*.description' => 'nullable|string',
            'available_months.*.nominal' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            $vehicle->update($request->only(['brand_id', 'car', 'description', 'price']));

            if ($request->has('available_months')) {
                // Delete existing months and create new ones
                AvailableMonth::where('installment_id', $vehicle->id)->delete();

                foreach ($request->available_months as $month) {
                    AvailableMonth::create([
                        'installment_id' => $vehicle->id,
                        'month' => $month['month'],
                        'description' => $month['description'] ?? null,
                        'nominal' => $month['nominal'],
                    ]);
                }
            }

            DB::commit();
            return response()->json([
                'message' => 'Vehicle updated successfully',
                'vehicle' => $vehicle->load('brand', 'availableMonths')
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to update vehicle', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete a vehicle.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $vehicle = Installment::find($id);

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        DB::beginTransaction();
        try {
            // Delete available months first
            AvailableMonth::where('installment_id', $vehicle->id)->delete();

            // Delete the vehicle
            $vehicle->delete();

            DB::commit();
            return response()->json(['message' => 'Vehicle deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to delete vehicle', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all brands for dropdown.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBrands()
    {
        $brands = Brand::all();
        return response()->json(['brands' => $brands], 200);
    }
}
