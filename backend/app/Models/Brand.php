<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $table = 'brands';
    public $timestamps = false;
    protected $fillable = ['brands'];

    /**
     * Get the installments for the brand.
     */
    public function installments()
    {
        return $this->hasMany(Installment::class, 'brand_id');
    }
}