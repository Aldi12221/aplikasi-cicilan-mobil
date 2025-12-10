<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ValidationController;
use App\Http\Controllers\Api\InstalmentController;
use App\Http\Controllers\Api\ValidatorController;
use App\Http\Controllers\Api\ValidatorAuthController;
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
});