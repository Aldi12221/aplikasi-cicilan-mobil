<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\roles;
use App\Models\Validation;

class Validator extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'validators';
    protected $fillable = ['name', 'email', 'password', 'role_id'];
    protected $hidden = ['password', 'remember_token'];
    protected $with = ['role']; // Automatically load role relationship

    public function validations()
    {
        return $this->hasMany(Validation::class, 'validator_id');
    }
    public function role(): BelongsTo
    {
        return $this->belongsTo(roles::class, 'role_id', 'id');

    }
}