<?php

// app/Models/InstalmentApplication.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstalmentApplication extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'society_id',
        'installment_id',
        'months',
        'notes',
        'apply_status',
    ];

    // ... (relasi dan method lainnya)

    public function installment()
    {
        return $this->belongsTo(Installment::class);
    }

    public function society()
    {
        return $this->belongsTo(Society::class);
    }
}