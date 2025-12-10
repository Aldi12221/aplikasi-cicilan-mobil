<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    use HasFactory;

    protected $table = 'installments';
    public $timestamps = false;
    protected $fillable = ['brand_id', 'car', 'description', 'price'];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function availableMonths()
    {
        return $this->hasMany(AvailableMonth::class, 'installment_id');
    }
}