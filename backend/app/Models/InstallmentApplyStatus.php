<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstallmentApplyStatus extends Model
{
    use HasFactory;

    protected $table = 'installment_apply_statuses';
    public $timestamps = false;
    protected $fillable = ['status'];

    public function installmentApplications()
    {
        return $this->hasMany(InstallmentApplySociety::class, 'installment_apply_status_id');
    }
}