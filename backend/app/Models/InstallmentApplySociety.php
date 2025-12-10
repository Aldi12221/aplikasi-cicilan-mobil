<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstallmentApplySociety extends Model
{
    use HasFactory;

    protected $table = 'installment_apply_societies';
    public $timestamps = false;
    protected $fillable = [
        'society_id',
        'installment_id',
        'months',
        'notes',
        'installment_apply_status_id',
    ];

    public function society()
    {
        return $this->belongsTo(Society::class, 'society_id');
    }

    public function installment()
    {
        return $this->belongsTo(Installment::class, 'installment_id');
    }
    
    public function applyStatus()
    {
        return $this->belongsTo(InstallmentApplyStatus::class, 'installment_apply_status_id');
    }
}