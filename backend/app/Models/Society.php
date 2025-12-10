<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
class Society extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $table = 'societies';
    public $timestamps = false;
    protected $hidden = ['password', 'login_tokens'];
    protected $fillable = [
        'id_card_number', 'password', 'name', 'born_date', 'gender', 'address', 'regional_id', 'login_tokens'
    ];
    public function regional()
    {
        return $this->belongsTo(Regional::class, 'regional_id');
    }
    public function validation()
    {
        return $this->hasOne(Validation::class, 'society_id');
    }
    
    public function applications()
    {
        return $this->hasMany(InstalmentApplication::class);
    }
}