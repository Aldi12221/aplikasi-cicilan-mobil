<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    use HasFactory;

    protected $table = 'validations';
    protected $fillable = [
        'society_id',
        'status',
        'job',
        'job_description',
        'income',
        'validator_id',
        'notes',
    ];

    public function society()
    {
        return $this->belongsTo(Society::class, 'society_id');
    }

    public function validator()
    {
        return $this->belongsTo(Validator::class, 'validator_id');
    }
}