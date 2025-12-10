<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    use HasFactory;

    protected $table = 'regionals';
    public $timestamps = false;
    protected $fillable = ['province', 'district'];

    public function societies()
    {
        return $this->hasMany(Society::class, 'regional_id');
    }
}