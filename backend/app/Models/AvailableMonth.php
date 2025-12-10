<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvailableMonth extends Model
{
    use HasFactory;

    protected $table = 'available_months';
    public $timestamps = false;
    protected $fillable = ['installment_id', 'month', 'description', 'nominal'];

    /**
     * Get the installment that the available month belongs to.
     */
    public function installment()
    {
        return $this->belongsTo(Installment::class, 'installment_id');
    }
}