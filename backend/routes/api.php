<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ValidationController;
use App\Http\Controllers\Api\InstalmentController;
use App\Http\Controllers\Api\ValidatorController;
use App\Http\Controllers\Api\ValidatorAuthController;
use App\Http\Controllers\Api\AdminApplicationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {


    Route::post('auth/login', [AuthController::class, 'login']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::prefix('validation')->group(function () {
            Route::post('/', [ValidationController::class, 'requestValidation']);
            Route::get('s', [ValidationController::class, 'getValidation']);
        });
        Route::prefix('instalment_cars')->group(function () {
            Route::get('/', [InstalmentController::class, 'getAllInstalmentCars']);
            Route::get('/{id}', [InstalmentController::class, 'getInstalmentDetail']);
        });
        Route::prefix('applications')->group(function () {
            Route::post('/', [InstalmentController::class, 'applyForInstalment']);
            Route::get('/', [InstalmentController::class, 'getMyApplications']);
        });
    });


    Route::prefix('validator')->group(function () {
        Route::post('auth/login', [ValidatorAuthController::class, 'login']);


        Route::middleware('auth:validator')->group(function () {
            Route::post('auth/logout', [ValidatorAuthController::class, 'logout']);
            Route::get('validations', [ValidatorController::class, 'getPendingValidations']);
            Route::post('validations/{id}/accept', [ValidatorController::class, 'acceptValidation']);
            Route::post('validations/{id}/reject', [ValidatorController::class, 'rejectValidation']);
        });
    });

    // Admin routes (for company role)
    Route::prefix('admin')->middleware('auth:validator')->group(function () {
        // Vehicle management
        Route::get('vehicles', [App\Http\Controllers\Api\AdminVehicleController::class, 'index']);
        Route::post('vehicles', [App\Http\Controllers\Api\AdminVehicleController::class, 'store']);
        Route::get('vehicles/{id}', [App\Http\Controllers\Api\AdminVehicleController::class, 'show']);
        Route::put('vehicles/{id}', [App\Http\Controllers\Api\AdminVehicleController::class, 'update']);
        Route::delete('vehicles/{id}', [App\Http\Controllers\Api\AdminVehicleController::class, 'destroy']);
        Route::get('brands', [App\Http\Controllers\Api\AdminVehicleController::class, 'getBrands']);

        // Application management
        Route::get('applications', [AdminApplicationController::class, 'index']);
        Route::post('applications/{id}/accept', [AdminApplicationController::class, 'acceptApplication']);
        Route::post('applications/{id}/reject', [AdminApplicationController::class, 'rejectApplication']);
    });
});